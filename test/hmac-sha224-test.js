YUI.add('algo-hmac-sha224-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'HMAC SHA224',

        testVector1: function () {
            Y.Assert.areEqual('4e841ce7a4ae83fbcf71e3cd64bfbf277f73a14680aae8c518ac7861', C.HmacSHA224('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString());
        },

        testVector2: function () {
            Y.Assert.areEqual('a30e01098bc6dbbf45690f3a7e9e6d0f8bbea2a39e6148008fd05e44', C.HmacSHA224('what do ya want for nothing?', 'Jefe').toString());
        },

        testVector3: function () {
            Y.Assert.areEqual('cbff7c2716bbaa7c77bed4f491d3e8456cb6c574e92f672b291acf5b', C.HmacSHA224(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
        },

        testVector4: function () {
            Y.Assert.areEqual('61bf669da4fdcd8e5c3bd09ebbb4a986d3d1b298d3ca05c511f7aeff', C.HmacSHA224('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A'));
        },

        testVector5: function () {
            Y.Assert.areEqual('16fc69ada3c3edc1fe9144d6b98d93393833ae442bedf681110a1176', C.HmacSHA224('abcdefghijklmnopqrstuvwxyz', 'A'));
        },

        testUpdate: function () {
            var hmac = C.algo.HMAC.create(C.algo.SHA224, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
            hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

            Y.Assert.areEqual(C.HmacSHA224(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString(), hmac.finalize().toString());
        },

        testInputIntegrity: function () {
            var message = C.lib.WordArray.create([0x12345678]);
            var key = C.lib.WordArray.create([0x12345678]);

            var expectedMessage = message.toString();
            var expectedKey = key.toString();

            C.HmacSHA224(message, key);

            Y.Assert.areEqual(expectedMessage, message.toString());
            Y.Assert.areEqual(expectedKey, key.toString());
        },

        testRespectKeySigBytes: function () {
            var key = C.lib.WordArray.random(8);
            key.sigBytes = 4;

            var keyClamped = key.clone();
            keyClamped.clamp();

            Y.Assert.areEqual(CryptoJS.HmacSHA224("Message", keyClamped).toString(), CryptoJS.HmacSHA224("Message", key).toString());
        }
    }));
}, '$Rev$');
