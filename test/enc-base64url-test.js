YUI.add('enc-base64url-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'Base64url',

        testStringifyUrlSafe: function () {
            Y.Assert.areEqual('-_8', C.enc.Base64url.stringify(C.lib.WordArray.create([0xfbff0000], 2)));
        },

        testStringifyUrlUnsafe: function () {
            Y.Assert.areEqual('+/8=', C.enc.Base64url.stringify(C.lib.WordArray.create([0xfbff0000], 2), false));
        },

        testParseUrlSafe: function () {
            Y.Assert.areEqual(C.lib.WordArray.create([0xfbff0000], 2).toString(), C.enc.Base64url.parse('-_8').toString());
        },

        testParseUrlUnsafe: function () {
            Y.Assert.areEqual(C.lib.WordArray.create([0xfbff0000], 2).toString(), C.enc.Base64url.parse('+/8', false).toString());
        },

        testParsePadded: function () {
            Y.Assert.areEqual(
                C.lib.WordArray.create([0x666f6f62, 0x61720000], 1).toString(),
                C.enc.Base64url.parse('Zg==').toString()
            );
            Y.Assert.areEqual(
                C.lib.WordArray.create([0x74657374], 4).toString(),
                C.enc.Base64url.parse('dGVzdA==').toString()
            );
        },

        testParseUrlUnsafeThenUrlSafe: function () {
            C.enc.Base64url.parse('Zg==', false);

            Y.Assert.areEqual(C.lib.WordArray.create([0xfbff0000], 2).toString(), C.enc.Base64url.parse('-_8').toString());
        },

        testParseUrlSafeThenUrlUnsafe: function () {
            C.enc.Base64url.parse('-_8');

            Y.Assert.areEqual(C.lib.WordArray.create([0xfbff0000], 2).toString(), C.enc.Base64url.parse('+/8', false).toString());
        }
    }));
}, '$Rev$');
