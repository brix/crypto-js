(function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var T = [];

    // Compute constants
    (function () {
        for (var i = 0; i < 64; i++) {
            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
        }
    }());

    /**
     * MD5 hash algorithm.
     */
    var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function () {
            this._hash = WordArray.create([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
        },

        _doProcessBlock: function (M, offset) {
            // Swap endian
            for (var i = 0; i < 16; i++) {
                // Shortcuts
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];

                // Swap
                M[offset_i] = (
                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
                );
            }

            // Shortcut
            var H = this._hash.words;

            // Working variables
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];

            // Computation
            for (var i = 0; i < 64; i += 4) {
                if (i < 16) {
                    a = FF(a, b, c, d, M[offset + i],     7,  T[i]);
                    d = FF(d, a, b, c, M[offset + i + 1], 12, T[i + 1]);
                    c = FF(c, d, a, b, M[offset + i + 2], 17, T[i + 2]);
                    b = FF(b, c, d, a, M[offset + i + 3], 22, T[i + 3]);
                } else if (i < 32) {
                    a = GG(a, b, c, d, M[offset + ((i + 1) % 16)],  5,  T[i]);
                    d = GG(d, a, b, c, M[offset + ((i + 6) % 16)],  9,  T[i + 1]);
                    c = GG(c, d, a, b, M[offset + ((i + 11) % 16)], 14, T[i + 2]);
                    b = GG(b, c, d, a, M[offset + (i % 16)],        20, T[i + 3]);
                } else if (i < 48) {
                    a = HH(a, b, c, d, M[offset + ((i * 3 + 5) % 16)],  4,  T[i]);
                    d = HH(d, a, b, c, M[offset + ((i * 3 + 8) % 16)],  11, T[i + 1]);
                    c = HH(c, d, a, b, M[offset + ((i * 3 + 11) % 16)], 16, T[i + 2]);
                    b = HH(b, c, d, a, M[offset + ((i * 3 + 14) % 16)], 23, T[i + 3]);
                } else /* if (i < 64) */ {
                    a = II(a, b, c, d, M[offset + ((i * 3) % 16)],      6,  T[i]);
                    d = II(d, a, b, c, M[offset + ((i * 3 + 7) % 16)],  10, T[i + 1]);
                    c = II(c, d, a, b, M[offset + ((i * 3 + 14) % 16)], 15, T[i + 2]);
                    b = II(b, c, d, a, M[offset + ((i * 3 + 5) % 16)],  21, T[i + 3]);
                }
            }

            // Intermediate hash value
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
            );
            data.sigBytes = (dataWords.length + 1) * 4;

            // Hash final blocks
            this._process();

            // Shortcut
            var H = this._hash.words;

            // Swap endian
            for (var i = 0; i < 4; i++) {
                // Shortcut
                var H_i = H[i];

                // Swap
                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
            }
        }
    });

    function FF(a, b, c, d, x, s, t) {
        var n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function GG(a, b, c, d, x, s, t) {
        var n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

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
     *     var hash = CryptoJS.MD5('message');
     *     var hash = CryptoJS.MD5(wordArray);
     */
    C.MD5 = Hasher._createHelper(MD5);

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
     *     var hmac = CryptoJS.HmacMD5(message, key);
     */
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
}(Math));
