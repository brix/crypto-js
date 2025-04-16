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

export default function hmacSha256Test() {
  describe('hmacSha256Test',()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('hmacSha256Test_testVector1', 0,()=> {
      expect('492ce020fe2534a5789dc3848806c78f4f6711397f08e7e7a12ca5a4483c8aa6')
        .assertEqual(CryptoJS.HmacSHA256('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
    it('hmacSha256Test_testVector2', 0,()=> {
      expect('5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843')
        .assertEqual(CryptoJS.HmacSHA256('what do ya want for nothing?', 'Jefe').toString())
    })

    it('hmacSha256Test_testVector3', 0,()=> {
      expect('7dda3cc169743a6484649f94f0eda0f9f2ff496a9733fb796ed5adb40a44c3c1')
        .assertEqual(CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
          .toString())
    })
    it('hmacSha256Test_testVector4', 0,()=> {
      expect('a89dc8178c1184a62df87adaa77bf86e93064863d93c5131140b0ae98b866687')
        .assertEqual(CryptoJS.HmacSHA256('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
    })
    it('hmacSha256Test_testVector5', 0,()=> {
      expect('d8cb78419c02fe20b90f8b77427dd9f81817a751d74c2e484e0ac5fc4e6ca986')
        .assertEqual(CryptoJS.HmacSHA256('abcdefghijklmnopqrstuvwxyz', 'A').toString())
    })
    it('hmacSha256Test_testUpdate', 0,()=> {
      let hmac:CryptoJS.algo.HMAC = Utils.getCryptoSHA256HMAC();

      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

      expect(CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
        .toString())
        .assertEqual(hmac.finalize().toString())
    })
    it('hmacSha256Test_testInputIntegrity', 0,()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);
      let key:CryptoJS.lib.WordArray  = CryptoJS.lib.WordArray.create([0x12345678]);

      let expectedMessage:string  = message.toString();
      let expectedKey:string  = key.toString();

      CryptoJS.HmacSHA256(message, key);


      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
    })
    it('hmacSha256Test_testRespectKeySigBytes', 0,()=> {
      let key:CryptoJS.lib.WordArray = Utils.getCryptoJSRandom();
      key.sigBytes = 4;

      let keyClamped:CryptoJS.lib.WordArray = key.clone();

      keyClamped.clamp();

      expect(CryptoJS.HmacSHA256("Message", keyClamped).toString())
        .assertEqual(CryptoJS.HmacSHA256("Message", key).toString())
    })

  })
}