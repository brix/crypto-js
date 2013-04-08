YUI.add('algo-sha1-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'SHA1',

        profileSinglePartMessage: function () {
            var singlePartMessage = '';
            for (var i = 0; i < 500; i++) {
                singlePartMessage += '12345678901234567890123456789012345678901234567890';
            }

            C.algo.SHA1.create().finalize(singlePartMessage) + '';
        },

        profileMultiPartMessage: function () {
            var sha1 = C.algo.SHA1.create();
            for (var i = 0; i < 500; i++) {
                sha1.update('12345678901234567890123456789012345678901234567890');
            }
            sha1.finalize() + '';
        }
    });
}, '$Rev$');
