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
import { Random } from './interface/interface'
import { Utils } from './interface/Utils'

export default function hmacSha224Test() {
  describe('hmacSha224Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('hmacSha224Test_testVector1', 0, ()=> {
      expect('4e841ce7a4ae83fbcf71e3cd64bfbf277f73a14680aae8c518ac7861')
        .assertEqual(CryptoJS.HmacSHA224('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
    it('hmacSha224Test_testVector2', 0, ()=> {
      expect('a30e01098bc6dbbf45690f3a7e9e6d0f8bbea2a39e6148008fd05e44')
        .assertEqual(CryptoJS.HmacSHA224('what do ya want for nothing?', 'Jefe').toString())
    })

    it('hmacSha224Test_testVector3', 0, ()=> {
      expect('cbff7c2716bbaa7c77bed4f491d3e8456cb6c574e92f672b291acf5b')
        .assertEqual(CryptoJS.HmacSHA224(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
          .toString())
    })
    it('hmacSha224Test_testVector4', 0, ()=> {
      expect('61bf669da4fdcd8e5c3bd09ebbb4a986d3d1b298d3ca05c511f7aeff')
        .assertEqual(CryptoJS.HmacSHA224('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
    })
    it('hmacSha224Test_testVector5', 0, ()=> {
      expect('16fc69ada3c3edc1fe9144d6b98d93393833ae442bedf681110a1176')
        .assertEqual(CryptoJS.HmacSHA224('abcdefghijklmnopqrstuvwxyz', 'A').toString())
    })
    it('hmacSha224Test_testUpdate', 0, ()=> {
      let hmac:CryptoJS.algo.HMAC = Utils.getSHA224()

      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

      expect(CryptoJS.HmacSHA224(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
        .toString())
        .assertEqual(hmac.finalize().toString())
    })
    it('hmacSha224Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);
      let key:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();

      CryptoJS.HmacSHA224(message, key);

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
    })
    it('hmacSha224Test_testRespectKeySigBytes', 0, ()=> {
      let key:CryptoJS.lib.WordArray = Utils.getCryptoJSRandom();

      key.sigBytes = 4;

      key.clone().clamp();

      expect(CryptoJS.HmacSHA224("Message", key.clone()).toString())
        .assertEqual(CryptoJS.HmacSHA224("Message", key.clone()).toString())
    })

  })
}