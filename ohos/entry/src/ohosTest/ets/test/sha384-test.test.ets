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

export default function sha384Test() {
  describe('sha384Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('sha384Test_testVector1', 0, ()=> {
      expect('38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b')
        .assertEqual(CryptoJS.SHA384('').toString())
    })
    it('sha384Test_testVector2', 0, ()=> {
      expect('ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1')
        .assertEqual(CryptoJS.SHA384('The quick brown fox jumps over the lazy dog').toString())
    })
    it('sha384Test_testVector3', 0, ()=> {
      expect('ed892481d8272ca6df370bf706e4d7bc1b5739fa2177aae6c50e946678718fc67a7af2819a021c2fc34e91bdb63409d7')
        .assertEqual(CryptoJS.SHA384('The quick brown fox jumps over the lazy dog.').toString())
    })

    it('sha384Test_testUpdateAndLongMessage', 0, ()=> {
      let sha384:CryptoJS.Hasher = Utils.getCryptoCreate()

      for (let i = 0; i < 100; i++) {
        sha384.update('12345678901234567890123456789012345678901234567890');
      }
      expect('297a519246d6f639a4020119e1f03fc8d77171647b2ff75ea4125b7150fed0cdcc93f8dca1c3c6a624d5e88d780d82cd')
        .assertEqual( sha384.finalize().toString())
    })
    it('sha384Test_testClone', 0, ()=> {
      let sha384:CryptoJS.Hasher = Utils.getCryptoCreate()

      expect(CryptoJS.SHA384('a').toString()).assertEqual( sha384.update('a').clone().finalize().toString())
      expect(CryptoJS.SHA384('ab').toString()).assertEqual( sha384.update('b').clone().finalize().toString())
      expect(CryptoJS.SHA384('abc').toString()).assertEqual(sha384.update('c').clone().finalize().toString())
    })
    it('sha384Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expected:string = message.toString();

      CryptoJS.SHA384(message);


      expect(expected).assertEqual(message.toString())
    })
    it('sha384Test_testHelper', 0, ()=> {
      expect(CryptoJS.algo.SHA384.create()
        .finalize('')
        .toString()).assertEqual(CryptoJS.SHA384('').toString())
    })
    it('sha384Test_testHmacHelper', 0, ()=> {
      expect(CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA384, CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'))
        .finalize('Hi There')
        .toString())
        .assertEqual(CryptoJS.HmacSHA384('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
  })
}