YUI.add('algo-sha512-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'SHA512',

        profileSinglePartMessage: function () {
            var singlePartMessage = '';
            for (var i = 0; i < 500; i++) {
                singlePartMessage += '12345678901234567890123456789012345678901234567890';
            }

            C.algo.SHA512.create().finalize(singlePartMessage) + '';
        },

        profileMultiPartMessage: function () {
            var sha512 = C.algo.SHA512.create();
            for (var i = 0; i < 500; i++) {
                sha512.update('12345678901234567890123456789012345678901234567890');
            }
            sha512.finalize() + '';
        }
    });
}, '$Rev$');
