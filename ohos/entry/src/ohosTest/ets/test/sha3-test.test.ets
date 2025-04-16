/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the MIT License, (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import { CryptoJS } from '@ohos/crypto-js'
import { Utils } from './interface/Utils'

export default function sha3Test() {
  describe('sha3Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    let outputLength512:Record<string,number>={
      'outputLength': 512
    }
    it('sha3Test_testVector1', 0, ()=> {

      expect('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e')
        .assertEqual(CryptoJS.SHA3('', outputLength512).toString())
    })
    it('sha3Test_testVector2', 0, ()=> {
      expect('81950e7096d31d4f22e3db71cac725bf59e81af54c7ca9e6aeee71c010fc5467466312a01aa5c137cfb140646941556796f612c9351268737c7e9a2b9631d1fa')
        .assertEqual(CryptoJS.SHA3(CryptoJS.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), outputLength512).toString())
    })
    let outputLength384:Record<string,number>={
      'outputLength': 384
    }
    it('sha3Test_testVector3', 0, ()=> {
      expect('2c23146a63a29acf99e73b88f8c24eaa7dc60aa771780ccc006afbfa8fe2479b2dd2b21362337441ac12b515911957ff')
        .assertEqual(CryptoJS.SHA3('', outputLength384).toString())
    })
    it('sha3Test_testVector4', 0, ()=> {
      expect('6bff1c8405a3fe594e360e3bccea1ebcd509310dc79b9e45c263783d7a5dd662c6789b18bd567dbdda1554f5bee6a860')
        .assertEqual(CryptoJS.SHA3(CryptoJS.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), outputLength384).toString())
    })
    let outputLength256:Record<string,number>={
      'outputLength': 256
    }
    it('sha3Test_testVector5', 0, ()=> {
      expect('c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470')
        .assertEqual(CryptoJS.SHA3('',outputLength256).toString())
    })
    it('sha3Test_testVector6', 0, ()=> {
      expect('348fb774adc970a16b1105669442625e6adaa8257a89effdb5a802f161b862ea')
        .assertEqual(CryptoJS.SHA3(CryptoJS.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), outputLength256).toString())
    })

    let outputLength224:Record<string,number>={
      'outputLength': 224
    }
    it('sha3Test_testVector7', 0, ()=> {
      expect('f71837502ba8e10837bdd8d365adb85591895602fc552b48b7390abd')
        .assertEqual(CryptoJS.SHA3('', outputLength224).toString())
    })
    it('sha3Test_testVector8', 0, ()=> {
      expect('5af56987ea9cf11fcd0eac5ebc14b037365e9b1123e31cb2dfc7929a')
        .assertEqual(CryptoJS.SHA3(CryptoJS.enc.Hex.parse('3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1'), outputLength224).toString())
    })
    it('sha3Test_testDefaultOutputLength', 0, ()=> {
      expect('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e')
        .assertEqual(CryptoJS.SHA3('').toString())
    })
    it('sha3Test_testClone', 0, ()=> {

      let sha3:CryptoJS.Hasher = Utils.getAlgoSHA3()

      expect(CryptoJS.SHA3('a').toString()).assertEqual(sha3.update('a').clone().finalize().toString())
      expect(CryptoJS.SHA3('ab').toString()).assertEqual(sha3.update('b').clone().finalize().toString())
      expect(CryptoJS.SHA3('abc').toString()).assertEqual(sha3.update('c').clone().finalize().toString())
    })
    it('sha3Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expected:string = message.toString();

      CryptoJS.SHA3(message);

      // Test
      expect(expected).assertEqual(message.toString())
    })

    it('sha3Test_testHelper', 0, ()=> {
      // Test

      expect(CryptoJS.algo.SHA3.create(outputLength256)
        .finalize('')
        .toString()).assertEqual(CryptoJS.SHA3('', outputLength256).toString())
    })
    it('sha3Test_testHmacHelper', 0, ()=> {
      // Test
      expect(CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA3, CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.HmacSHA3('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })


  })
}