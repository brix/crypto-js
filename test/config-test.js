YUI.add('config-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'Config',

        setUp: function () {
            this.data = {
                saltA: CryptoJS.enc.Hex.parse('AA00000000000000'),
                saltB: CryptoJS.enc.Hex.parse('BB00000000000000')
            };
        },

        testEncrypt: function () {
            Y.Assert.areEqual(C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA }).toString(), C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA }).toString());
            Y.Assert.areNotEqual(C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA }).toString(), C.AES.encrypt('Test', 'Pass', { salt: this.data.saltB }).toString());
        },

        testDecrypt: function () {
            var encryptedA = C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA });
            var encryptedB = C.AES.encrypt('Test', 'Pass', { salt: this.data.saltB });
            Y.Assert.areEqual('Test', C.AES.decrypt(encryptedA, 'Pass').toString(C.enc.Utf8));
            Y.Assert.areEqual('Test', C.AES.decrypt(encryptedB, 'Pass').toString(C.enc.Utf8));
        },

        testCustomKDFHasher: function () {
            //SHA1
            let encryptedSHA1 = C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA, hasher: C.algo.SHA1}).toString();
            Y.Assert.areEqual('Test', C.AES.decrypt(encryptedSHA1, 'Pass', { hasher: C.algo.SHA1}).toString(C.enc.Utf8));

            //SHA256
            let encryptedSHA256 = C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA, hasher: C.algo.SHA256}).toString();
            Y.Assert.areEqual('Test', C.AES.decrypt(encryptedSHA256, 'Pass', { hasher: C.algo.SHA256}).toString(C.enc.Utf8));

            //SHA512
            let encryptedSHA512 = C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA, hasher: C.algo.SHA512}).toString();
            Y.Assert.areEqual('Test', C.AES.decrypt(encryptedSHA512, 'Pass', { hasher: C.algo.SHA512}).toString(C.enc.Utf8));

            //Default: MD5
            let encryptedDefault = C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA }).toString();
            let encryptedMD5 = C.AES.encrypt('Test', 'Pass', { salt: this.data.saltA, hasher: C.algo.MD5}).toString();
            Y.Assert.areEqual('Test', C.AES.decrypt(encryptedMD5, 'Pass', { hasher: C.algo.MD5}).toString(C.enc.Utf8));
            Y.Assert.areEqual(encryptedDefault, encryptedMD5);

            //Different KDFHasher
            Y.Assert.areNotEqual(encryptedDefault, encryptedSHA1);
            Y.Assert.areNotEqual(encryptedDefault, encryptedSHA256);
            Y.Assert.areNotEqual(encryptedDefault, encryptedSHA512);
        }
    }));
}, '$Rev$');