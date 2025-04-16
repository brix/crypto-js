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

export default function hmacSha384Test() {
  describe('hmacSha384Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('hmacSha384Test_testVector1', 0, ()=> {
      expect('7afaa633e20d379b02395915fbc385ff8dc27dcd3885e1068ab942eeab52ec1f20ad382a92370d8b2e0ac8b83c4d53bf')
        .assertEqual(CryptoJS.HmacSHA384('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
    it('hmacSha384Test_testVector2', 0, ()=> {
      expect('af45d2e376484031617f78d2b58a6b1b9c7ef464f5a01b47e42ec3736322445e8e2240ca5e69e2c78b3239ecfab21649')
        .assertEqual(CryptoJS.HmacSHA384('what do ya want for nothing?', 'Jefe').toString())
    })

    it('hmacSha384Test_testVector3', 0, ()=> {
      expect('1383e82e28286b91f4cc7afbd13d5b5c6f887c05e7c4542484043a37a5fe45802a9470fb663bd7b6570fe2f503fc92f5')
        .assertEqual(CryptoJS.HmacSHA384(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
          .toString())
    })
    it('hmacSha384Test_testVector4', 0, ()=> {
      expect('365dfb271adb8e30fe6c74220b75df1b38c2d19b9d37f2e5a0ec2f3f22bd0406bf5b786e98d81b82c36d3d8a1be6cd07')
        .assertEqual(CryptoJS.HmacSHA384('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
    })
    it('hmacSha384Test_testVector5', 0, ()=> {
      expect('a8357d5e84da64140e41545562ae0782e2a58e39c6cd98939fad8d9080e774c84b7eaca4ba07f6dbf0f12eab912c5285')
        .assertEqual(CryptoJS.HmacSHA384('abcdefghijklmnopqrstuvwxyz', 'A').toString())
    })
    it('hmacSha384Test_testUpdate', 0, ()=> {
      let hmac:CryptoJS.algo.HMAC = Utils.getHMAC()

      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

      expect(CryptoJS.HmacSHA384(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
        .toString())
        .assertEqual(hmac.finalize().toString())
    })
    it('hmacSha384Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let key:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();

      CryptoJS.HmacSHA384(message, key);


      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
    })
    it('hmacSha384Test_testRespectKeySigBytes', 0, ()=> {
      let key:CryptoJS.lib.WordArray = Utils.getCryptoJSRandom()
      key.sigBytes = 4;

      let keyClamped:CryptoJS.lib.WordArray = key.clone();

      keyClamped.clamp();

      expect(CryptoJS.HmacSHA384("Message", keyClamped).toString())
        .assertEqual(CryptoJS.HmacSHA384("Message", key).toString())
    })

  })
}