YUI.add('algo-sha3-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'SHA3',

        testVector1: function () {
            Y.Assert.areEqual('a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26', C.SHA3('', { outputLength: 512 }).toString());
        },

        testVector2: function () {
            Y.Assert.areEqual('6e8b8bd195bdd560689af2348bdc74ab7cd05ed8b9a57711e9be71e9726fda4591fee12205edacaf82ffbbaf16dff9e702a708862080166c2ff6ba379bc7ffc2', C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 512 }).toString());
        },

        testVector3: function () {
            Y.Assert.areEqual('0c63a75b845e4f7d01107d852e4c2485c51a50aaaa94fc61995e71bbee983a2ac3713831264adb47fb6bd1e058d5f004', C.SHA3('', { outputLength: 384 }).toString());
        },

        testVector4: function () {
            Y.Assert.areEqual('128dc611762be9b135b3739484cfaadca7481d68514f3dfd6f5d78bb1863ae68130835cdc7061a7ed964b32f1db75ee1', C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 384 }).toString());
        },

        testVector5: function () {
            Y.Assert.areEqual('a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a', C.SHA3('', { outputLength: 256 }).toString());
        },

        testVector6: function () {
            Y.Assert.areEqual('c11f3522a8fb7b3532d80b6d40023a92b489addad93bf5d64b23f35e9663521c', C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 256 }).toString());
        },

        testVector7: function () {
            Y.Assert.areEqual('6b4e03423667dbb73b6e15454f0eb1abd4597f9a1b078e3f5b5a6bc7', C.SHA3('', { outputLength: 224 }).toString());
        },

        testVector8: function () {
            Y.Assert.areEqual('94689ea9f347dda8dd798a858605868743c6bd03a6a65c6085d52bed', C.SHA3(C.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), { outputLength: 224 }).toString());
        },

        testDefaultOutputLength: function () {
            Y.Assert.areEqual('a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26', C.SHA3('').toString());
        },

        testClone: function () {
            var sha3 = C.algo.SHA3.create();

            Y.Assert.areEqual(C.SHA3('a').toString(), sha3.update('a').clone().finalize().toString());
            Y.Assert.areEqual(C.SHA3('ab').toString(), sha3.update('b').clone().finalize().toString());
            Y.Assert.areEqual(C.SHA3('abc').toString(), sha3.update('c').clone().finalize().toString());
        },

        testInputIntegrity: function () {
            var message = C.lib.WordArray.create([0x12345678]);

            var expected = message.toString();

            C.SHA3(message);

            Y.Assert.areEqual(expected, message.toString());
        },

        testHelper: function () {
            Y.Assert.areEqual(C.algo.SHA3.create({ outputLength: 256 }).finalize('').toString(), C.SHA3('', { outputLength: 256 }).toString());
        },

        testHmacHelper: function () {
            Y.Assert.areEqual(C.algo.HMAC.create(C.algo.SHA3, C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).finalize('Hi There').toString(), C.HmacSHA3('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString());
        }
    }));
}, '$Rev$');
