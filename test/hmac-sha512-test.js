YUI.add('algo-hmac-sha512-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'HMAC SHA512',

        testVector1: function () {
            Y.Assert.areEqual('7641c48a3b4aa8f887c07b3e83f96affb89c978fed8c96fcbbf4ad596eebfe496f9f16da6cd080ba393c6f365ad72b50d15c71bfb1d6b81f66a911786c6ce932', C.HmacSHA512('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString());
        },

        testVector2: function () {
            Y.Assert.areEqual('164b7a7bfcf819e2e395fbe73b56e0a387bd64222e831fd610270cd7ea2505549758bf75c05a994a6d034f65f8f0e6fdcaeab1a34d4a6b4b636e070a38bce737', C.HmacSHA512('what do ya want for nothing?', 'Jefe').toString());
        },

        testVector3: function () {
            Y.Assert.areEqual('ad9b5c7de72693737cd5e9d9f41170d18841fec1201c1c1b02e05cae116718009f771cad9946ddbf7e3cde3e818d9ae85d91b2badae94172d096a44a79c91e86', C.HmacSHA512(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
        },

        testVector4: function () {
            Y.Assert.areEqual('a303979f7c94bb39a8ab6ce05cdbe28f0255da8bb305263e3478ef7e855f0242729bf1d2be55398f14da8e63f0302465a8a3f76c297bd584ad028d18ed7f0195', C.HmacSHA512('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A'));
        },

        testVector5: function () {
            Y.Assert.areEqual('8c2d56f7628325e62124c0a870ad98d101327fc42696899a06ce0d7121454022fae597e42c25ac3a4c380fd514f553702a5b0afaa9b5a22050902f024368e9d9', C.HmacSHA512('abcdefghijklmnopqrstuvwxyz', 'A'));
        },

        testUpdate: function () {
            var hmac = C.algo.HMAC.create(C.algo.SHA512, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

            Y.Assert.areEqual(C.HmacSHA512(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString(), hmac.finalize().toString());
        },

        testInputIntegrity: function () {
            var message = C.lib.WordArray.create([0x12345678]);
            var key = C.lib.WordArray.create([0x12345678]);

            var expectedMessage = message.toString();
            var expectedKey = key.toString();

            C.HmacSHA512(message, key);

            Y.Assert.areEqual(expectedMessage, message.toString());
            Y.Assert.areEqual(expectedKey, key.toString());
        },

        testRespectKeySigBytes: function () {
            var key = C.lib.WordArray.random(8);
            key.sigBytes = 4;

            var keyClamped = key.clone();
            keyClamped.clamp();

            Y.Assert.areEqual(CryptoJS.HmacSHA512("Message", keyClamped).toString(), CryptoJS.HmacSHA512("Message", key).toString());
        }
    }));
}, '$Rev$');
