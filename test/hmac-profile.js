YUI.add('algo-hmac-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'HMAC',

        setUp: function () {
            this.data = {
                key: C.lib.WordArray.random(128/8)
            };
        },

        profileSinglePartMessage: function () {
            var singlePartMessage = '';
            for (var i = 0; i < 500; i++) {
                singlePartMessage += '12345678901234567890123456789012345678901234567890';
            }

            C.algo.HMAC.create(C.algo.MD5, this.data.key).finalize(singlePartMessage) + '';
        },

        profileMultiPartMessage: function () {
            var hmac = C.algo.HMAC.create(C.algo.MD5, this.data.key);
            for (var i = 0; i < 500; i++) {
                hmac.update('12345678901234567890123456789012345678901234567890');
            }
            hmac.finalize() + '';
        }
    });
}, '$Rev$');
