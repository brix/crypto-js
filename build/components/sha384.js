/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;
    var SHA512 = C_algo.SHA512;

    /**
     * SHA-384 hash algorithm.
     */
    var SHA384 = C_algo.SHA384 = SHA512.extend({
        _doReset: function () {
            this._hash = X64WordArray.create([
                X64Word.create(0xcbbb9d5d, 0xc1059ed8), X64Word.create(0x629a292a, 0x367cd507),
                X64Word.create(0x9159015a, 0x3070dd17), X64Word.create(0x152fecd8, 0xf70e5939),
                X64Word.create(0x67332667, 0xffc00b31), X64Word.create(0x8eb44a87, 0x68581511),
                X64Word.create(0xdb0c2e0d, 0x64f98fa7), X64Word.create(0x47b5481d, 0xbefa4fa4)
            ]);
        },

        _doFinalize: function () {
            SHA512._doFinalize.call(this);

            this._hash.sigBytes -= 16;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA384('message');
     *     var hash = CryptoJS.SHA384(wordArray);
     */
    C.SHA384 = SHA512._createHelper(SHA384);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA384(message, key);
     */
    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
}());
