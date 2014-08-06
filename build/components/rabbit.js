/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // Reusable objects
    var S = [];
    var G = [];

    /**
     * Rabbit stream cipher algorithm
     */
    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
        _doReset: function () {
            // Shortcuts
            var K = this._key.words;

            var K0 = K[0];
            var K1 = K[1];
            var K2 = K[2];
            var K3 = K[3];

            // Generate initial state values
            var X = this._X = [
                K0, (K3 << 16) | (K2 >>> 16),
                K1, (K0 << 16) | (K3 >>> 16),
                K2, (K1 << 16) | (K0 >>> 16),
                K3, (K2 << 16) | (K1 >>> 16)
            ];

            // Generate initial counter values
            var C = this._C = [
                (K2 << 16) | (K2 >>> 16), (K0 & 0xffff0000) | (K1 & 0x0000ffff),
                (K3 << 16) | (K3 >>> 16), (K1 & 0xffff0000) | (K2 & 0x0000ffff),
                (K0 << 16) | (K0 >>> 16), (K2 & 0xffff0000) | (K3 & 0x0000ffff),
                (K1 << 16) | (K1 >>> 16), (K3 & 0xffff0000) | (K0 & 0x0000ffff)
            ];

            // Carry bit
            this._b = 0;

            // Iterate the system four times
            for (var i = 0; i < 4; i++) {
                nextState.call(this);
            }

            // Modify the counters
            for (var i = 0; i < 8; i++) {
                C[i] ^= X[(i + 4) & 7];
            }

            // Shortcut
            var iv = this.cfg.iv;

            // IV setup
            if (iv) {
                // Shortcuts
                var IV = iv.words;
                var IV0 = IV[0];
                var IV1 = IV[1];

                // Generate four subvectors
                var i0 = (((IV0 << 8) | (IV0 >>> 24)) & 0x00ff00ff) | (((IV0 << 24) | (IV0 >>> 8)) & 0xff00ff00);
                var i2 = (((IV1 << 8) | (IV1 >>> 24)) & 0x00ff00ff) | (((IV1 << 24) | (IV1 >>> 8)) & 0xff00ff00);
                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

                // Modify counter values
                C[0] ^= i0;
                C[1] ^= i1;
                C[2] ^= i2;
                C[3] ^= i3;
                C[4] ^= i0;
                C[5] ^= i1;
                C[6] ^= i2;
                C[7] ^= i3;

                // Iterate the system four times
                for (var i = 0; i < 4; i++) {
                    nextState.call(this);
                }
            }
        },

        _doProcessBlock: function (M, offset) {
            // Shortcut
            var X = this._X;

            // Iterate the system
            nextState.call(this);

            // Generate four keystream words
            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

            for (var i = 0; i < 4; i++) {
                // Shortcut
                var Si = S[i];

                // Swap endian
                Si = (((Si << 8)  | (Si >>> 24)) & 0x00ff00ff) |
                     (((Si << 24) | (Si >>> 8))  & 0xff00ff00);

                // Encrypt
                M[offset + i] ^= Si;
            }
        },

        blockSize: 128/32,

        ivSize: 64/32
    });

    function nextState() {
        // Shortcuts
        var X = this._X;
        var C = this._C;

        // Calculate new counter values
        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < 0x4d34d34d ? 1 : 0)) | 0;
        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < 0xd34d34d3 ? 1 : 0)) | 0;
        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < 0x34d34d34 ? 1 : 0)) | 0;
        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < 0x4d34d34d ? 1 : 0)) | 0;
        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < 0xd34d34d3 ? 1 : 0)) | 0;
        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < 0x34d34d34 ? 1 : 0)) | 0;
        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < 0x4d34d34d ? 1 : 0)) | 0;
        this._b = (C[7] >>> 0) < 0xd34d34d3 ? 1 : 0;

        // Calculate the g-values
        for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];

            // Construct high and low argument for squaring
            var ga = gx & 0xffff;
            var gb = gx >>> 16;

            // Calculate high and low result of squaring
            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

            // High XOR low
            G[i] = gh ^ gl;
        }

        // Shortcuts
        var G0 = G[0];
        var G1 = G[1];
        var G2 = G[2];
        var G3 = G[3];
        var G4 = G[4];
        var G5 = G[5];
        var G6 = G[6];
        var G7 = G[7];

        // Calculate new state values
        X[0] = (G0 + ((G7 << 16) | (G7 >>> 16)) + ((G6 << 16) | (G6 >>> 16))) | 0;
        X[1] = (G1 + ((G0 << 8)  | (G0 >>> 24)) + G7) | 0;
        X[2] = (G2 + ((G1 << 16) | (G1 >>> 16)) + ((G0 << 16) | (G0 >>> 16))) | 0;
        X[3] = (G3 + ((G2 << 8)  | (G2 >>> 24)) + G1) | 0;
        X[4] = (G4 + ((G3 << 16) | (G3 >>> 16)) + ((G2 << 16) | (G2 >>> 16))) | 0;
        X[5] = (G5 + ((G4 << 8)  | (G4 >>> 24)) + G3) | 0;
        X[6] = (G6 + ((G5 << 16) | (G5 >>> 16)) + ((G4 << 16) | (G4 >>> 16))) | 0;
        X[7] = (G7 + ((G6 << 8)  | (G6 >>> 24)) + G5) | 0;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
     */
    C.Rabbit = StreamCipher._createHelper(Rabbit);
}());
