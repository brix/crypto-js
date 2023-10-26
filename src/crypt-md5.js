// Original location: https://stackoverflow.com/a/17002577 https://pastebin.com/V4R5r9pi

(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var MD5 = C_algo.MD5;
    var Utf8 = C.enc.Utf8;

    // Constants
    var SALT_MAXLEN = 8;
    var MD5_MAGIC = "$1$";

    var PHP_CRYPT_MD5 = C_algo.PHP_CRYPT_MD5 = Base.extend({

        /**
         * Initializes a newly created Password hashing function.
         *
         * @example
         *
         *     var md5crypt = CryptoJS.algo.PHP_CRYPT_MD5.create();
         */
        init: function () {
        },

        /**
         * Computes the the PHP MD5 based crypt hash
         *
         * @param {WordArray|string} password The password.
         * @param {string} salt A salt (this can be the output of the crypt
         *      function).
         *
         * @return {string} The password hash
         *
         * @example
         *
         *     var hash = kdf.compute(password, salt);
         */
        compute: function (password, salt) {
            if (typeof password == 'string') {
                password = Utf8.parse(password);
            }

            var saltStart = 0;
            if(salt.indexOf(MD5_MAGIC) === 0) {
                saltStart += MD5_MAGIC.length;
            }

            var saltEnd = Math.min(SALT_MAXLEN+MD5_MAGIC.length,
                salt.indexOf("$", saltStart));

            if(saltEnd < 0) {
                saltEnd = SALT_MAXLEN + MD5_MAGIC.length;
            }
            var realSalt = salt.substring(saltStart, saltEnd);

            var ctx = MD5.create();

            ctx.update(password);
            ctx.update(realSalt);
            ctx.update(password);

            var fin = ctx.finalize();

            ctx.reset();

            ctx.update(password);
            ctx.update(MD5_MAGIC);
            ctx.update(realSalt);

            for(var pl = password.sigBytes; pl > 0; pl -= 16) {
                var words = WordArray.create(
                        fin.words, Math.min(pl, 16)
                );
                ctx.update(words);
            }

            var empty = WordArray.create([0], 1);
            var pwc1 = WordArray.create(password.words, 1);
            for(var i = password.sigBytes; i !== 0; i >>>= 1) {
                if((i & 1) !== 0) {
                    ctx.update(empty);
                } else {
                    ctx.update(pwc1);
                }
            }

            fin = ctx.finalize();

            for(i = 0; i < 1000; ++i) {
                ctx.reset();

                if((i & 1) !== 0) {
                    ctx.update(password);
                } else {
                    ctx.update(fin);
                }

                if((i % 3) !== 0) {
                    ctx.update(realSalt);
                }

                if((i % 7) !== 0) {
                    ctx.update(password);
                }

                if((i & 1) !== 0) {
                    ctx.update(fin);
                } else {
                    ctx.update(password);
                }

                fin = ctx.finalize();
            }

            var finb = this.wordArrayToByteArray(fin);
            var result = MD5_MAGIC + realSalt + "$" +
                this.to64((finb[ 0] << 16) | (finb[ 6] << 8) | finb[12], 4) +
                this.to64((finb[ 1] << 16) | (finb[ 7] << 8) | finb[13], 4) +
                this.to64((finb[ 2] << 16) | (finb[ 8] << 8) | finb[14], 4) +
                this.to64((finb[ 3] << 16) | (finb[ 9] << 8) | finb[15], 4) +
                this.to64((finb[ 4] << 16) | (finb[10] << 8) | finb[ 5], 4) +
                this.to64( finb[11], 2);

            return result;
        },

        /**
         * Converts a WordArray-object to an array of bytes. I'm surprised that
         * this is not part of the CryptoJS library.
         *
         * @param {WordArray} wa The numeric value to be converted
         *
         * @return {array} The bytes contained in the WordArray object
         */
        wordArrayToByteArray: function(wa) {
            var bytes = [], words = wa.words;

            for(var i = 0; i < wa.sigBytes; ++i) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;

                bytes.push(bite);
            }

            return bytes;
        },

        /**
         * Implements the to64-function used by the php_md5_crypt_r function.
         *
         * @param {number} v The numeric value to be converted
         * @param {number} n The number of digits to return
         *
         * @return {string} The base64 digits.
         */
        to64: function(v, n) {
            var itoa64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "abcdefghijklmnopqrstuvwxyz";
            var result = "";

            while(--n >= 0) {
                result += itoa64.charAt(v & 0x3f);
                v >>= 6;
            }

            return result;
        }
    });

    /**
     * Computes the the PHP MD5 based crypt hash
     *
     * @param {WordArray|string} password The password.
     * @param {string} salt A salt.
     *
     * @return {string} The password hash
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.PHP_CRYPT_MD5(password, salt);
     */
    C.PHP_CRYPT_MD5 = function (password, salt) {
        return PHP_CRYPT_MD5.create().compute(password, salt);
    };
}());
