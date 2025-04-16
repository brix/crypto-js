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

export default function sha256Test() {
  describe('sha256Test',  ()=> {
    beforeAll( ()=> {
    })
    beforeEach( ()=> {
    })
    it('sha256Test_testVector1', 0,  ()=> {
      expect('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
        .assertEqual(CryptoJS.SHA256('').toString())
    })
    it('sha256Test_testVector2', 0,  ()=> {
      expect('ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb')
        .assertEqual(CryptoJS.SHA256('a').toString())
    })
    it('sha256Test_testVector3', 0,  ()=> {
      expect('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
        .assertEqual(CryptoJS.SHA256('abc').toString())
    })
    it('sha256Test_testVector4', 0,  ()=> {
      expect('f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650')
        .assertEqual(CryptoJS.SHA256('message digest').toString())
    })
    it('sha256Test_testVector5', 0,  ()=> {
      expect('71c480df93d6ae2f1efad1447c66c9525e316218cf51fc8d9ed832f2daf18b73')
        .assertEqual(CryptoJS.SHA256('abcdefghijklmnopqrstuvwxyz').toString())
    })
    it('sha256Test_testVector6', 0,  ()=> {
      expect('db4bfcbd4da0cd85a60c3c37d3fbd8805c77f15fc6b1fdfe614ee0a7c8fdb4c0')
        .assertEqual(CryptoJS.SHA256('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').toString())
    })
    it('sha256Test_testVector7', 0,  ()=> {
      expect('f371bc4a311f2b009eef952dd83ca80e2b60026c8e935592d0f9c308453c813e')
        .assertEqual(CryptoJS.SHA256('12345678901234567890123456789012345678901234567890123456789012345678901234567890')
          .toString())
    })
    it('sha256Test_testUpdateAndLongMessage', 0,  ()=> {
      let algoSHA:CryptoJS.Hasher = Utils.getCryptoJSSHA256()
      for (let i = 0; i < 100; i++) {
        algoSHA.update('12345678901234567890123456789012345678901234567890');
      }

      expect('f8146961d9b73d8da49ccd526fca65439cdd5b402f76971556d5f52fd129843e')
        .assertEqual(algoSHA.finalize().toString())
    })
    it('sha256Test_testClone', 0,  ()=> {
      let algoSHA:CryptoJS.Hasher = Utils.getCryptoJSSHA256()

      expect(CryptoJS.SHA256('a').toString()).assertEqual(algoSHA.update('a').clone().finalize().toString())
      expect(CryptoJS.SHA256('ab').toString()).assertEqual(algoSHA.update('b').clone().finalize().toString())
      expect(CryptoJS.SHA256('abc').toString()).assertEqual(algoSHA.update('c').clone().finalize().toString())
    })
    it('sha256Test_testInputIntegrity', 0,  ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expected:string = message.toString();

      CryptoJS.SHA256(message);

      expect(expected).assertEqual(message.toString())
    })
    it('sha256Test_testHelper', 0,  ()=> {
      expect(CryptoJS.algo.SHA256.create()
        .finalize('')
        .toString()).assertEqual(CryptoJS.SHA256('').toString())
    })
    it('sha256Test_testHmacHelper', 0, ()=> {
      expect(CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'))
        .finalize('Hi There')
        .toString())
        .assertEqual(CryptoJS.HmacSHA256('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
  })
}