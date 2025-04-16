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
import { Key, KeyData } from './interface/interface'
import { Utils } from './interface/Utils'

export default function hmacSha512Test() {
  describe('hmacSha512Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('hmacSha512Test_testVector1', 0, ()=> {
      expect('7641c48a3b4aa8f887c07b3e83f96affb89c978fed8c96fcbbf4ad596eebfe496f9f16da6cd080ba393c6f365ad72b50d15c71bfb1d6b81f66a911786c6ce932')
        .assertEqual(CryptoJS.HmacSHA512('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
    it('hmacSha512Test_testVector2', 0, ()=> {
      expect('164b7a7bfcf819e2e395fbe73b56e0a387bd64222e831fd610270cd7ea2505549758bf75c05a994a6d034f65f8f0e6fdcaeab1a34d4a6b4b636e070a38bce737')
        .assertEqual(CryptoJS.HmacSHA512('what do ya want for nothing?', 'Jefe').toString())
    })

    it('hmacSha512Test_testVector3', 0, ()=> {
      expect('ad9b5c7de72693737cd5e9d9f41170d18841fec1201c1c1b02e05cae116718009f771cad9946ddbf7e3cde3e818d9ae85d91b2badae94172d096a44a79c91e86')
        .assertEqual(CryptoJS.HmacSHA512(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
          .toString())
    })
    it('hmacSha512Test_testVector4', 0, ()=> {
      expect('a303979f7c94bb39a8ab6ce05cdbe28f0255da8bb305263e3478ef7e855f0242729bf1d2be55398f14da8e63f0302465a8a3f76c297bd584ad028d18ed7f0195')
        .assertEqual(CryptoJS.HmacSHA512('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
    })
    it('hmacSha512Test_testVector5', 0, ()=> {
      expect('8c2d56f7628325e62124c0a870ad98d101327fc42696899a06ce0d7121454022fae597e42c25ac3a4c380fd514f553702a5b0afaa9b5a22050902f024368e9d9')
        .assertEqual(CryptoJS.HmacSHA512('abcdefghijklmnopqrstuvwxyz', 'A').toString())
    })
    it('hmacSha512Test_testUpdate', 0, ()=> {
      let hmac:CryptoJS.algo.HMAC = Utils.getAlgoHMACryptoJS()

      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
      hmac.update(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

      expect(CryptoJS.HmacSHA512(CryptoJS.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString())
        .assertEqual(hmac.finalize().toString())

    })
    it('hmacSha512Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);
      let key:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();

      CryptoJS.HmacSHA512(message, key);


      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
    })
    it('hmacSha512Test_testRespectKeySigBytes', 0, ()=> {
      let key:CryptoJS.lib.WordArray = Utils.getCryptoJSRandom()

      key.sigBytes = 4;

      key.clone().clamp();

      expect(CryptoJS.HmacSHA512("Message", key.clone()).toString())
        .assertEqual(CryptoJS.HmacSHA512("Message", key).toString())
    })

  })
}