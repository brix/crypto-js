YUI.add('algo-sha3-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'SHA3',

        profileSinglePartMessage: function () {
            var singlePartMessage = '';
            for (var i = 0; i < 500; i++) {
                singlePartMessage += '12345678901234567890123456789012345678901234567890';
            }

            C.algo.SHA3.create().finalize(singlePartMessage) + '';
        },

        profileMultiPartMessage: function () {
            var sha3 = C.algo.SHA3.create();
            for (var i = 0; i < 500; i++) {
                sha3.update('12345678901234567890123456789012345678901234567890');
            }
            sha3.finalize() + '';
        }
    });
}, '$Rev$');
