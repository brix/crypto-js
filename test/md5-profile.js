YUI.add('algo-md5-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'MD5',

        profileSinglePartMessage: function () {
            var singlePartMessage = '';
            for (var i = 0; i < 500; i++) {
                singlePartMessage += '12345678901234567890123456789012345678901234567890';
            }

            C.algo.MD5.create().finalize(singlePartMessage) + '';
        },

        profileMultiPartMessage: function () {
            var md5 = C.algo.MD5.create();
            for (var i = 0; i < 500; i++) {
                md5.update('12345678901234567890123456789012345678901234567890');
            }
            md5.finalize() + '';
        }
    });
}, '$Rev$');
