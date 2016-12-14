function extendWithCMAC(C) {
    function createExt(C) {
        /*
         * The MIT License (MIT)
         *
         * Copyright (c) 2015 artjomb
         */
        // put on ext property in CryptoJS
        var ext;
        if (!C.hasOwnProperty("ext")) {
            ext = C.ext = {};
        } else {
            ext = C.ext;
        }

        // Shortcuts
        var Base = C.lib.Base;
        var WordArray = C.lib.WordArray;

        // Constants
        ext.const_Zero = new WordArray.init([0x00000000, 0x00000000, 0x00000000, 0x00000000]);
        ext.const_One = new WordArray.init([0x00000000, 0x00000000, 0x00000000, 0x00000001]);
        ext.const_Rb = new WordArray.init([0x00000000, 0x00000000, 0x00000000, 0x00000087]); // 00..0010000111
        ext.const_Rb_Shifted = new WordArray.init([0x80000000, 0x00000000, 0x00000000, 0x00000043]); // 100..001000011
        ext.const_nonMSB = new WordArray.init([0xFFFFFFFF, 0xFFFFFFFF, 0x7FFFFFFF, 0x7FFFFFFF]); // 1^64 || 0^1 || 1^31 || 0^1 || 1^31

        /**
         * Looks into the object to see if it is a WordArray.
         *
         * @param obj Some object
         *
         * @returns {boolean}
         */
        ext.isWordArray = function(obj) {
            return obj && typeof obj.clamp === "function" && typeof obj.concat === "function" && typeof obj.words === "array";
        }

        /**
         * This padding is a 1 bit followed by as many 0 bits as needed to fill
         * up the block. This implementation doesn't work on bits directly,
         * but on bytes. Therefore the granularity is much bigger.
         */
        C.pad.OneZeroPadding = {
            pad: function (data, blocksize) {
                // Shortcut
                var blockSizeBytes = blocksize * 4;

                // Count padding bytes
                var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

                // Create padding
                var paddingWords = [];
                for (var i = 0; i < nPaddingBytes; i += 4) {
                    var paddingWord = 0x00000000;
                    if (i === 0) {
                        paddingWord = 0x80000000;
                    }
                    paddingWords.push(paddingWord);
                }
                var padding = new WordArray.init(paddingWords, nPaddingBytes);

                // Add padding
                data.concat(padding);
            },
            unpad: function () {
                // TODO: implement
            }
        };

        /**
         * No padding is applied. This is necessary for streaming cipher modes
         * like CTR.
         */
        C.pad.NoPadding = {
            pad: function () {},
            unpad: function () {}
        };

        /**
         * Returns the n leftmost bytes of the WordArray.
         *
         * @param {WordArray} wordArray WordArray to work on
         * @param {int} n Bytes to retrieve
         *
         * @returns new WordArray
         */
        ext.leftmostBytes = function(wordArray, n){
            var lmArray = wordArray.clone();
            lmArray.sigBytes = n;
            lmArray.clamp();
            return lmArray;
        };

        /**
         * Returns the n rightmost bytes of the WordArray.
         *
         * @param {WordArray} wordArray WordArray to work on
         * @param {int} n Bytes to retrieve (must be positive)
         *
         * @returns new WordArray
         */
        ext.rightmostBytes = function(wordArray, n){
            wordArray.clamp();
            var wordSize = 32;
            var rmArray = wordArray.clone();
            var bitsToShift = (rmArray.sigBytes - n) * 8;
            if (bitsToShift >= wordSize) {
                var popCount = Math.floor(bitsToShift/wordSize);
                bitsToShift -= popCount * wordSize;
                rmArray.words.splice(0, popCount);
                rmArray.sigBytes -= popCount * wordSize / 8;
            }
            if (bitsToShift > 0) {
                ext.bitshift(rmArray, bitsToShift);
                rmArray.sigBytes -= bitsToShift / 8;
            }
            return rmArray;
        };

        /**
         * Returns the n rightmost words of the WordArray. It assumes
         * that the current WordArray has at least n words.
         *
         * @param {WordArray} wordArray WordArray to work on
         * @param {int} n Words to retrieve (must be positive)
         *
         * @returns popped words as new WordArray
         */
        ext.popWords = function(wordArray, n){
            var left = wordArray.words.splice(0, n);
            wordArray.sigBytes -= n * 4;
            return new WordArray.init(left);
        };

        /**
         * Shifts the array to the left and returns the shifted dropped elements
         * as WordArray. The initial WordArray must contain at least n bytes and
         * they have to be significant.
         *
         * @param {WordArray} wordArray WordArray to work on (is modified)
         * @param {int} n Bytes to shift (must be positive, default 16)
         *
         * @returns new WordArray
         */
        ext.shiftBytes = function(wordArray, n){
            n = n || 16;
            var r = n % 4;
            n -= r;

            var shiftedArray = new WordArray.init();
            for(var i = 0; i < n; i += 4) {
                shiftedArray.words.push(wordArray.words.shift());
                wordArray.sigBytes -= 4;
                shiftedArray.sigBytes += 4;
            }
            if (r > 0) {
                shiftedArray.words.push(wordArray.words[0]);
                shiftedArray.sigBytes += r;

                ext.bitshift(wordArray, r * 8);
                wordArray.sigBytes -= r;
            }
            return shiftedArray;
        };

        /**
         * XORs arr2 to the end of arr1 array. This doesn't modify the current
         * array aside from clamping.
         *
         * @param {WordArray} arr1 Bigger array
         * @param {WordArray} arr2 Smaller array to be XORed to the end
         *
         * @returns new WordArray
         */
        ext.xorendBytes = function(arr1, arr2){
            // TODO: more efficient
            return ext.leftmostBytes(arr1, arr1.sigBytes-arr2.sigBytes)
                    .concat(ext.xor(ext.rightmostBytes(arr1, arr2.sigBytes), arr2));
        };

        /**
         * Doubling operation on a 128-bit value. This operation modifies the
         * passed array.
         *
         * @param {WordArray} wordArray WordArray to work on
         *
         * @returns passed WordArray
         */
        ext.dbl = function(wordArray){
            var carry = ext.msb(wordArray);
            ext.bitshift(wordArray, 1);
            ext.xor(wordArray, carry === 1 ? ext.const_Rb : ext.const_Zero);
            return wordArray;
        };

        /**
         * Inverse operation on a 128-bit value. This operation modifies the
         * passed array.
         *
         * @param {WordArray} wordArray WordArray to work on
         *
         * @returns passed WordArray
         */
        ext.inv = function(wordArray){
            var carry = wordArray.words[4] & 1;
            ext.bitshift(wordArray, -1);
            ext.xor(wordArray, carry === 1 ? ext.const_Rb_Shifted : ext.const_Zero);
            return wordArray;
        };

        /**
         * Check whether the word arrays are equal.
         *
         * @param {WordArray} arr1 Array 1
         * @param {WordArray} arr2 Array 2
         *
         * @returns boolean
         */
        ext.equals = function(arr1, arr2){
            if (!arr2 || !arr2.words || arr1.sigBytes !== arr2.sigBytes) {
                return false;
            }
            arr1.clamp();
            arr2.clamp();
            var equal = 0;
            for(var i = 0; i < arr1.words.length; i++) {
                equal |= arr1.words[i] ^ arr2.words[i];
            }
            return equal === 0;
        };

        /**
         * Retrieves the most significant bit of the WordArray as an Integer.
         *
         * @param {WordArray} arr
         *
         * @returns Integer
         */
        ext.msb = function(arr) {
            return arr.words[0] >>> 31;
        }
    }

    function createExtBit(C) {
        /*
         * The MIT License (MIT)
         *
         * Copyright (c) 2015 artjomb
         */
        // put on ext property in CryptoJS
        var ext;
        if (!C.hasOwnProperty("ext")) {
            ext = C.ext = {};
        } else {
            ext = C.ext;
        }

        /**
         * Shifts the array by n bits to the left. Zero bits are added as the
         * least significant bits. This operation modifies the current array.
         *
         * @param {WordArray} wordArray WordArray to work on
         * @param {int} n Bits to shift by
         *
         * @returns the WordArray that was passed in
         */
        ext.bitshift = function(wordArray, n){
            var carry = 0,
                words = wordArray.words,
                wres,
                skipped = 0,
                carryMask;
            if (n > 0) {
                while(n > 31) {
                    // delete first element:
                    words.splice(0, 1);

                    // add `0` word to the back
                    words.push(0);

                    n -= 32;
                    skipped++;
                }
                if (n == 0) {
                    // 1. nothing to shift if the shift amount is on a word boundary
                    // 2. This has to be done, because the following algorithm computes
                    // wrong values only for n==0
                    return carry;
                }
                for(var i = words.length - skipped - 1; i >= 0; i--) {
                    wres = words[i];
                    words[i] <<= n;
                    words[i] |= carry;
                    carry = wres >>> (32 - n);
                }
            } else if (n < 0) {
                while(n < -31) {
                    // insert `0` word to the front:
                    words.splice(0, 0, 0);

                    // remove last element:
                    words.length--;

                    n += 32;
                    skipped++;
                }
                if (n == 0) {
                    // nothing to shift if the shift amount is on a word boundary
                    return carry;
                }
                n = -n;
                carryMask = (1 << n) - 1;
                for(var i = skipped; i < words.length; i++) {
                    wres = words[i] & carryMask;
                    words[i] >>>= n;
                    words[i] |= carry;
                    carry = wres << (32 - n);
                }
            }
            return carry;
        };

        /**
         * Negates all bits in the WordArray. This manipulates the given array.
         *
         * @param {WordArray} wordArray WordArray to work on
         *
         * @returns the WordArray that was passed in
         */
        ext.neg = function(wordArray){
            var words = wordArray.words;
            for(var i = 0; i < words.length; i++) {
                words[i] = ~words[i];
            }
            return wordArray;
        };

        /**
         * Applies XOR on both given word arrays and returns a third resulting
         * WordArray. The initial word arrays must have the same length
         * (significant bytes).
         *
         * @param {WordArray} wordArray1 WordArray
         * @param {WordArray} wordArray2 WordArray
         *
         * @returns first passed WordArray (modified)
         */
        ext.xor = function(wordArray1, wordArray2){
            for(var i = 0; i < wordArray1.words.length; i++) {
                wordArray1.words[i] ^= wordArray2.words[i];
            }
            return wordArray1;
        };

        /**
         * Logical AND between the two passed arrays. Both arrays must have the
         * same length.
         *
         * @param {WordArray} arr1 Array 1
         * @param {WordArray} arr2 Array 2
         *
         * @returns new WordArray
         */
        ext.bitand = function(arr1, arr2){
            var newArr = arr1.clone(),
                tw = newArr.words,
                ow = arr2.words;
            for(var i = 0; i < tw.length; i++) {
                tw[i] &= ow[i];
            }
            return newArr;
        };
    }

    function createCMAC(C) {
        /*
         * The MIT License (MIT)
         *
         * Copyright (c) 2015 artjomb
         */
        // Shortcuts
        var Base = C.lib.Base;
        var WordArray = C.lib.WordArray;
        var AES = C.algo.AES;
        var ext = C.ext;
        var OneZeroPadding = C.pad.OneZeroPadding;

        var CMAC = C.algo.CMAC = Base.extend({
            /**
             * Initializes a newly created CMAC
             *
             * @param {WordArray} key The secret key
             *
             * @example
             *
             *     var cmacer = CryptoJS.algo.CMAC.create(key);
             */
            init: function(key){
                // generate sub keys...
                this._aes = AES.createEncryptor(key, { iv: new WordArray.init(), padding: C.pad.NoPadding });

                // Step 1
                var L = this._aes.finalize(ext.const_Zero);

                // Step 2
                var K1 = L.clone();
                ext.dbl(K1);

                // Step 3
                if (!this._isTwo) {
                    var K2 = K1.clone();
                    ext.dbl(K2);
                } else {
                    var K2 = L.clone();
                    ext.inv(K2);
                }

                this._K1 = K1;
                this._K2 = K2;

                this._const_Bsize = 16;

                this.reset();
            },

            reset: function () {
                this._x = ext.const_Zero.clone();
                this._counter = 0;
                this._buffer = new WordArray.init();
            },

            update: function (messageUpdate) {
                if (!messageUpdate) {
                    return this;
                }

                // Shortcuts
                var buffer = this._buffer;
                var bsize = this._const_Bsize;

                if (typeof messageUpdate === "string") {
                    messageUpdate = C.enc.Utf8.parse(messageUpdate);
                }

                buffer.concat(messageUpdate);

                while(buffer.sigBytes > bsize){
                    var M_i = ext.shiftBytes(buffer, bsize);
                    ext.xor(this._x, M_i);
                    this._x.clamp();
                    this._aes.reset();
                    this._x = this._aes.finalize(this._x);
                    this._counter++;
                }

                // Chainable
                return this;
            },

            finalize: function (messageUpdate) {
                this.update(messageUpdate);

                // Shortcuts
                var buffer = this._buffer;
                var bsize = this._const_Bsize;

                var M_last = buffer.clone();
                if (buffer.sigBytes === bsize) {
                    ext.xor(M_last, this._K1);
                } else {
                    OneZeroPadding.pad(M_last, bsize/4);
                    ext.xor(M_last, this._K2);
                }

                ext.xor(M_last, this._x);

                this.reset(); // Can be used immediately afterwards

                this._aes.reset();
                return this._aes.finalize(M_last);
            },

            _isTwo: false
        });

        /**
         * Directly invokes the CMAC and returns the calculated MAC.
         *
         * @param {WordArray} key The key to be used for CMAC
         * @param {WordArray|string} message The data to be MAC'ed (either WordArray or UTF-8 encoded string)
         *
         * @returns {WordArray} MAC
         */
        C.CMAC = function(key, message){
            return CMAC.create(key).finalize(message);
        };

        C.algo.OMAC1 = CMAC;
        C.algo.OMAC2 = CMAC.extend({
            _isTwo: true
        });
    }

    createExt(C);
    createExtBit(C);
    createCMAC(C);
}

YUI.add('cipher-core-test', function (Y) {
    var C = CryptoJS;

    // Extend with CMAC to test `cipher-core.js` L:457-462
    extendWithCMAC(C);

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'Cipher',

        testCMAC: function () {
            Y.Assert.areEqual('35e1872b95ce5d99bb5dbbbbd79b9b9b', C.CMAC('69c4e0d86a7b0430d8cdb78070b4c55a', 'Test message').toString());
        }
    }));
}, '$Rev$');
