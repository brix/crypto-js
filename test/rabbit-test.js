YUI.add('algo-rabbit-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'Rabbit',

        testVector1: function () {
            Y.Assert.areEqual('02f74a1c26456bf5ecd6a536f05457b1', C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000')).ciphertext.toString());
        },

        testVector2: function () {
            Y.Assert.areEqual('9c51e28784c37fe9a127f63ec8f32d3d', C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('dc51c3ac3bfc62f12e3d36fe91281329')).ciphertext.toString());
        },

        testVector3: function () {
            Y.Assert.areEqual('9b60d002fd5ceb32accd41a0cd0db10c', C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('c09b0043e9e9ab0187e0c73383957415')).ciphertext.toString());
        },

        testVector4: function () {
            Y.Assert.areEqual('edb70567375dcd7cd89554f85e27a7c6', C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000'), { iv: C.enc.Hex.parse('0000000000000000') }).ciphertext.toString());
        },

        testVector5: function () {
            Y.Assert.areEqual('6d7d012292ccdce0e2120058b94ecd1f', C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000'), { iv: C.enc.Hex.parse('597e26c175f573c3') }).ciphertext.toString());
        },

        testVector6: function () {
            Y.Assert.areEqual('4d1051a123afb670bf8d8505c8d85a44', C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000'), { iv: C.enc.Hex.parse('2717f4d21a56eba6') }).ciphertext.toString());
        },

        testMultiPart: function () {
            var rabbit = C.algo.Rabbit.createEncryptor(C.enc.Hex.parse('00000000000000000000000000000000'));
            var ciphertext1 = rabbit.process(C.enc.Hex.parse('000000000000'));
            var ciphertext2 = rabbit.process(C.enc.Hex.parse('0000000000'));
            var ciphertext3 = rabbit.process(C.enc.Hex.parse('0000000000'));
            var ciphertext4 = rabbit.finalize();

            Y.Assert.areEqual('02f74a1c26456bf5ecd6a536f05457b1', ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString());
        },

        testInputIntegrity: function () {
            var message = C.enc.Hex.parse('00000000000000000000000000000000');
            var key = C.enc.Hex.parse('00000000000000000000000000000000');
            var iv = C.enc.Hex.parse('0000000000000000');

            var expectedMessage = message.toString();
            var expectedKey = key.toString();
            var expectedIv = iv.toString();

            C.Rabbit.encrypt(message, key, { iv: iv });

            Y.Assert.areEqual(expectedMessage, message.toString());
            Y.Assert.areEqual(expectedKey, key.toString());
            Y.Assert.areEqual(expectedIv, iv.toString());
        },

        testHelper: function () {
            // Save original random method
            var random = C.lib.WordArray.random;

            // Replace random method with one that returns a predictable value
            C.lib.WordArray.random = function (nBytes) {
                var words = [];
                for (var i = 0; i < nBytes; i += 4) {
                    words.push([0x11223344]);
                }

                return C.lib.WordArray.create(words, nBytes);
            };

            // Test
            Y.Assert.areEqual(C.algo.Rabbit.createEncryptor(C.MD5('Jefe')).finalize('Hi There').toString(), C.Rabbit.encrypt('Hi There', C.MD5('Jefe')).ciphertext.toString());
            Y.Assert.areEqual(C.lib.SerializableCipher.encrypt(C.algo.Rabbit, 'Hi There', C.MD5('Jefe')).toString(), C.Rabbit.encrypt('Hi There', C.MD5('Jefe')).toString());
            Y.Assert.areEqual(C.lib.PasswordBasedCipher.encrypt(C.algo.Rabbit, 'Hi There', 'Jefe').toString(), C.Rabbit.encrypt('Hi There', 'Jefe').toString());

            // Restore random method
            C.lib.WordArray.random = random;
        }
    }));
}, '$Rev$');
