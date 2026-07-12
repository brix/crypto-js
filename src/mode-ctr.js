/**
 * Counter block mode.
 */
CryptoJS.mode.CTR = (function () {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();

    var Encryptor = CTR.Encryptor = CTR.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;

            // Generate keystream
            if (iv) {
                counter = this._counter = iv.slice(0);

                // Zero-pad a short IV (e.g. a 12-byte/3-word nonce) up to
                // the cipher's full block size. Without this, counter[blockSize - 1]
                // is `undefined` after the first block, and `undefined + 1 | 0`
                // evaluates to 0 - the same value implicitly used (via bitwise
                // coercion) as the missing word during that first block's
                // keystream generation. That makes the counter appear
                // unchanged for one extra block, so blocks 1 and 2 are
                // encrypted with an identical keystream (a critical CTR-mode
                // keystream-reuse break) before incrementing correctly from
                // block 3 onward.
                for (var i = counter.length; i < blockSize; i++) {
                    counter[i] = 0;
                }

                // Remove IV for subsequent blocks
                this._iv = undefined;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);

            // Increment counter
            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

            // Encrypt
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    CTR.Decryptor = Encryptor;

    return CTR;
}());
