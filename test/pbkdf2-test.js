YUI.add('algo-pbkdf2-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'PBKDF2',

        testKeySize128: function () {
            Y.Assert.areEqual('62929ab995a1111c75c37bc562261ea3', C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128/32 }).toString());
        },

        testKeySize256: function () {
            Y.Assert.areEqual('62929ab995a1111c75c37bc562261ea3fb3cdc7e725c4ca87c03cec5bb7663e1', C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256/32 }).toString());
        },

        testKeySize128Iterations2: function () {
            Y.Assert.areEqual('262fb72ea65b44ab5ceba7f8c8bfa781', C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128/32, iterations: 2 }).toString());
        },

        testKeySize256Iterations2: function () {
            Y.Assert.areEqual('262fb72ea65b44ab5ceba7f8c8bfa7815ff9939204eb7357a59a75877d745777', C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256/32, iterations: 2 }).toString());
        },

        testKeySize128Iterations1200: function () {
            Y.Assert.areEqual('c76a982415f1acc71dc197273c5b6ada', C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128/32, iterations: 1200 }).toString());
        },

        testKeySize256Iterations1200: function () {
            Y.Assert.areEqual('c76a982415f1acc71dc197273c5b6ada32f62915ed461718aad32843762433fa', C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 256/32, iterations: 1200 }).toString());
        },

        testKeySize128Iterations5: function () {
            Y.Assert.areEqual('74e98b2e9eeddaab3113c1efc6d82b07', C.PBKDF2('password', C.enc.Hex.parse('1234567878563412'), { keySize: 128/32, iterations: 5 }).toString());
        },

        testKeySize256Iterations5: function () {
            Y.Assert.areEqual('74e98b2e9eeddaab3113c1efc6d82b073c4860195b3e0737fa21a4778f376321', C.PBKDF2('password', C.enc.Hex.parse('1234567878563412'), { keySize: 256/32, iterations: 5 }).toString());
        },

        testKeySize128Iterations1200PassPhraseEqualsBlockSize: function () {
            Y.Assert.areEqual('c1dfb29a4d2f2fb67c6f78d074d66367', C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size', { keySize: 128/32, iterations: 1200 }).toString());
        },

        testKeySize256Iterations1200PassPhraseEqualsBlockSize: function () {
            Y.Assert.areEqual('c1dfb29a4d2f2fb67c6f78d074d663671e6fd4da1e598572b1fecf256cb7cf61', C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size', { keySize: 256/32, iterations: 1200 }).toString());
        },

        testKeySize128Iterations1200PassPhraseExceedsBlockSize: function () {
            Y.Assert.areEqual('22344bc4b6e32675a8090f3ea80be01d', C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase exceeds block size', { keySize: 128/32, iterations: 1200 }).toString());
        },

        testKeySize256Iterations1200PassPhraseExceedsBlockSize: function () {
            Y.Assert.areEqual('22344bc4b6e32675a8090f3ea80be01d5f95126a2cddc3facc4a5e6dca04ec58', C.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase exceeds block size', { keySize: 256/32, iterations: 1200 }).toString());
        },

        testKeySize128Iterations50: function () {
            Y.Assert.areEqual('44b0781253db3141ac4174af29325818', C.PBKDF2(C.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', { keySize: 128/32, iterations: 50 }).toString());
        },

        testKeySize256Iterations50: function () {
            Y.Assert.areEqual('44b0781253db3141ac4174af29325818584698d507a79f9879033dec308a2b77', C.PBKDF2(C.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', { keySize: 256/32, iterations: 50 }).toString());
        },

        testInputIntegrity: function () {
            var password = C.lib.WordArray.create([0x12345678]);
            var salt = C.lib.WordArray.create([0x12345678]);

            var expectedPassword = password.toString();
            var expectedSalt = salt.toString();

            C.PBKDF2(password, salt);

            Y.Assert.areEqual(expectedPassword, password.toString());
            Y.Assert.areEqual(expectedSalt, salt.toString());
        },

        testHelper: function () {
            Y.Assert.areEqual(C.algo.PBKDF2.create({ keySize: 128/32 }).compute('password', 'ATHENA.MIT.EDUraeburn').toString(), C.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', { keySize: 128/32 }).toString());
        }
    }));
}, '$Rev$');
