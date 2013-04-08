YUI.add('algo-pbkdf2-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'PBKDF2',

        profileKeySize256Iterations20: function () {
            C.algo.PBKDF2.create({ keySize: 256/32, iterations: 20 }).compute('password', 'ATHENA.MIT.EDUraeburn');
        }
    });
}, '$Rev$');
