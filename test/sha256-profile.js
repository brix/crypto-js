YUI.add('algo-sha256-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'SHA256',

        profileSinglePartMessage: function () {
            var singlePartMessage = '';
            for (var i = 0; i < 500; i++) {
                singlePartMessage += '12345678901234567890123456789012345678901234567890';
            }

            C.algo.SHA256.create().finalize(singlePartMessage) + '';
        },

        profileMultiPartMessage: function () {
            var sha256 = C.algo.SHA256.create();
            for (var i = 0; i < 500; i++) {
                sha256.update('12345678901234567890123456789012345678901234567890');
            }
            sha256.finalize() + '';
        }
    });
}, '$Rev$');
