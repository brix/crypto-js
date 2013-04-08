YUI.add('algo-evpkdf-profile', function (Y) {
    var C = CryptoJS;

    Y.Profiler.add({
        name: 'EvpKDF',

        profileKeySize256Iterations20: function () {
            C.algo.EvpKDF.create({ keySize: 256/32, iterations: 20 }).compute('password', 'ATHENA.MIT.EDUraeburn');
        }
    });
}, '$Rev$');
