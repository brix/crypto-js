YUI.add('algo-aes-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'BF',

        setUp: function () {
            this.data = {
                saltA: CryptoJS.enc.Hex.parse('AA00000000000000')
            };
        },

        testEncrypt: function () {
            let encryptedA = C.BF.encrypt('Test',
            'pass',
            {
                salt: this.data.saltA,
                hasher: CryptoJS.algo.SHA256
            }).toString();
            Y.Assert.areEqual('U2FsdGVkX1+qAAAAAAAAAKTIU8MPrBdH', encryptedA);
        },

        testDecrypt: function () {
            let encryptedA = C.BF.encrypt('Test',
            'pass',
            {
                salt: this.data.saltA,
                hasher: CryptoJS.algo.SHA256
            }).toString();
            Y.Assert.areEqual('Test', C.BF.decrypt(encryptedA, 'pass', {hasher: CryptoJS.algo.SHA256}).toString(C.enc.Utf8));
        }
    }));
}, '$Rev$');
