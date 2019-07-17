YUI.add('algo-hmac-sha256-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'HMAC SHA256',

        testVector1: function () {
            Y.Assert.areEqual('492ce020fe2534a5789dc3848806c78f4f6711397f08e7e7a12ca5a4483c8aa6', C.HmacSHA256('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString());
        },

        testVector2: function () {
            Y.Assert.areEqual('5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843', C.HmacSHA256('what do ya want for nothing?', 'Jefe').toString());
        },

        testVector3: function () {
            Y.Assert.areEqual('7dda3cc169743a6484649f94f0eda0f9f2ff496a9733fb796ed5adb40a44c3c1', C.HmacSHA256(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
        },

        testVector4: function () {
            Y.Assert.areEqual('a89dc8178c1184a62df87adaa77bf86e93064863d93c5131140b0ae98b866687', C.HmacSHA256('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString());
        },

        testVector5: function () {
            Y.Assert.areEqual('d8cb78419c02fe20b90f8b77427dd9f81817a751d74c2e484e0ac5fc4e6ca986', C.HmacSHA256('abcdefghijklmnopqrstuvwxyz', 'A').toString());
        },

        testUpdate: function () {
            var hmac = C.algo.HMAC.create(C.algo.SHA256, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

            Y.Assert.areEqual(C.HmacSHA256(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString(), hmac.finalize().toString());
        },

        testInputIntegrity: function () {
            var message = C.lib.WordArray.create([0x12345678]);
            var key = C.lib.WordArray.create([0x12345678]);

            var expectedMessage = message.toString();
            var expectedKey = key.toString();

            C.HmacSHA256(message, key);

            Y.Assert.areEqual(expectedMessage, message.toString());
            Y.Assert.areEqual(expectedKey, key.toString());
        },

        testRespectKeySigBytes: function () {
            var key = C.lib.WordArray.random(8);
            key.sigBytes = 4;

            var keyClamped = key.clone();
            keyClamped.clamp();

            Y.Assert.areEqual(CryptoJS.HmacSHA256("Message", keyClamped).toString(), CryptoJS.HmacSHA256("Message", key).toString());
        }
    }));
}, '$Rev$');
