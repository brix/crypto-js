YUI.add('algo-rc4-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'RC4',

        setUp: function () {
            this.data = {
                key: C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f')
            };
        },

        profileSinglePartMessage: function () {
            var singlePartMessage = '';
            for (var i = 0; i < 500; i++) {
                singlePartMessage += '12345678901234567890123456789012345678901234567890';
            }

            C.algo.RC4.createEncryptor(this.data.key).finalize(singlePartMessage) + '';
        },

        profileMultiPartMessage: function () {
            var rc4 = C.algo.RC4.createEncryptor(this.data.key);
            for (var i = 0; i < 500; i++) {
                rc4.process('12345678901234567890123456789012345678901234567890') + '';
            }
            rc4.finalize() + '';
        }
    });
}, '$Rev$');
