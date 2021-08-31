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
        }
    }));
}, '$Rev$');