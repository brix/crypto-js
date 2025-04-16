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

export default function sha1Test() {
  describe('sha1Test', ()=> {
    beforeAll(()=>{
    })
    beforeEach(()=> {
    })
    it('sha1Test_testVector1', 0, ()=> {
      expect('da39a3ee5e6b4b0d3255bfef95601890afd80709')
        .assertEqual(CryptoJS.SHA1('').toString())
    })
    it('sha1Test_testVector2', 0, ()=> {
      expect('86f7e437faa5a7fce15d1ddcb9eaeaea377667b8')
        .assertEqual(CryptoJS.SHA1('a').toString())
    })
    it('sha1Test_testVector3', 0,()=> {
      expect('a9993e364706816aba3e25717850c26c9cd0d89d')
        .assertEqual(CryptoJS.SHA1('abc').toString())
    })
    it('sha1Test_testVector4', 0, ()=> {
      expect('c12252ceda8be8994d5fa0290a47231c1d16aae3')
        .assertEqual(CryptoJS.SHA1('message digest').toString())
    })
    it('sha1Test_testVector5', 0, ()=> {
      expect('32d10c7b8cf96570ca04ce37f2a19d84240d3a89')
        .assertEqual(CryptoJS.SHA1('abcdefghijklmnopqrstuvwxyz').toString())
    })
    it('sha1Test_testVector6', 0, ()=> {
      expect('761c457bf73b14d27e9e9265c46f4b4dda11f940')
        .assertEqual(CryptoJS.SHA1('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').toString())
    })
    it('sha1Test_testVector7', 0, ()=> {
      expect('50abf5706a150990a08b2c5ea40fa0e585554732')
        .assertEqual(CryptoJS.SHA1('12345678901234567890123456789012345678901234567890123456789012345678901234567890')
          .toString())
    })
    it('sha1Test_testUpdateAndLongMessage', 0, ()=> {
      let sha1:CryptoJS.Hasher = Utils.getCryptoJSSHA1();

      for (let i = 0; i < 100; i++) {
        sha1.update('12345678901234567890123456789012345678901234567890');
      }
      expect('85e4c4b3933d5553ebf82090409a9d90226d845c')
        .assertEqual(sha1.finalize().toString())
    })
    it('sha1Test_testClone', 0, ()=> {
      let sha1:CryptoJS.Hasher = Utils.getCryptoJSSHA1();

      expect(CryptoJS.SHA1('a').toString()).assertEqual(sha1.update('a').clone().finalize().toString())
      expect(CryptoJS.SHA1('ab').toString()).assertEqual(sha1.update('b').clone().finalize().toString())
      expect(CryptoJS.SHA1('abc').toString()).assertEqual(sha1.update('c').clone().finalize().toString())
    })
    it('sha1Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expected:string = message.toString();

      CryptoJS.SHA1(message);


      // Test
      expect(expected).assertEqual(message.toString())
    })
    it('sha1Test_testHelper', 0, ()=> {
      // Test
      expect(CryptoJS.algo.SHA1.create()
        .finalize('')
        .toString()).assertEqual(CryptoJS.SHA1('').toString())
    })
    it('sha1Test_testHmacHelper', 0, ()=> {
      // Test
      expect(CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.HmacSHA1('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })


  })
}