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
import { Utils,randomFun,createRandomFun } from './interface/Utils'

export default function rabbitLegacyTest() {
  describe('rabbitLegacyTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('rabbitLegacyTest_testVector1', 0, ()=> {
      expect('02f74a1c26456bf5ecd6a536f05457b1')
        .assertEqual(CryptoJS.RabbitLegacy.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('00000000000000000000000000000000'))
          .ciphertext
          .toString())
    })
    it('rabbitLegacyTest_testVector2', 0, ()=> {
      expect('9c51e28784c37fe9a127f63ec8f32d3d')
        .assertEqual(CryptoJS.RabbitLegacy.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('dc51c3ac3bfc62f12e3d36fe91281329'))
          .ciphertext
          .toString())
    })

    it('rabbitLegacyTest_testVector3', 0, ()=> {
      expect('9b60d002fd5ceb32accd41a0cd0db10c')
        .assertEqual(CryptoJS.RabbitLegacy.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('c09b0043e9e9ab0187e0c73383957415'))
          .ciphertext
          .toString())
    })
    let ivParseVector4:Record<string,CryptoJS.lib.WordArray>={
      'iv': CryptoJS.enc.Hex.parse('0000000000000000')
    }
    it('rabbitLegacyTest_testVector4', 0, ()=> {
      expect('edb70567375dcd7cd89554f85e27a7c6')
        .assertEqual(CryptoJS.RabbitLegacy.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), ivParseVector4).ciphertext.toString())
    })

    let ivParseVector5:Record<string,CryptoJS.lib.WordArray>={
      'iv': CryptoJS.enc.Hex.parse('597e26c175f573c3')
    }
    it('rabbitLegacyTest_testVector5', 0, ()=> {
      expect('6d7d012292ccdce0e2120058b94ecd1f')
        .assertEqual(CryptoJS.RabbitLegacy.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), ivParseVector5).ciphertext.toString())
    })
    let ivParseVector6:Record<string,CryptoJS.lib.WordArray>={
      'iv': CryptoJS.enc.Hex.parse('2717f4d21a56eba6')
    }
    it('rabbitLegacyTest_testVector6', 0, ()=> {
      expect('4d1051a123afb670bf8d8505c8d85a44')
        .assertEqual(CryptoJS.RabbitLegacy.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), ivParseVector6).ciphertext.toString())
    })
    it('rabbitLegacyTest_testMultiPart', 0, ()=> {
      let rabbit:CryptoJS.Cipher = Utils.getCreateRabbitLegacyEncryptor()

      let ciphertext1:string = rabbit.process(CryptoJS.enc.Hex.parse('000000000000')).toString();
      let ciphertext2:string = rabbit.process(CryptoJS.enc.Hex.parse('0000000000')).toString();
      let ciphertext3:string = rabbit.process(CryptoJS.enc.Hex.parse('0000000000')).toString();
      let ciphertext4:string = rabbit.finalize().toString();

      expect('02f74a1c26456bf5ecd6a536f05457b1')
        .assertEqual(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
    })
    it('rabbitLegacyTest_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
      let iv:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0000000000000000');

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();
      let expectedIv:string = iv.toString();

      let ivRecord:Record<string,CryptoJS.lib.WordArray>={
      'iv': iv
      }
      CryptoJS.RabbitLegacy.encrypt(message, key, ivRecord);

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
      expect(expectedIv).assertEqual(iv.toString())
    })
    it('rabbitLegacyTest_testHelper', 0, ()=> {
      // Save original random method
      let random:(nBytes: number) =>CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random;

      // Replace random method with one that returns a predictable value
      createRandomFun(CryptoJS.lib.WordArray)

      // Test
      expect(CryptoJS.algo.RabbitLegacy.createEncryptor(CryptoJS.MD5('Jefe'))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.RabbitLegacy.encrypt('Hi There', CryptoJS.MD5('Jefe')).ciphertext.toString())
      expect(CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.RabbitLegacy, 'Hi There', CryptoJS.MD5('Jefe')).toString())
        .assertEqual(CryptoJS.RabbitLegacy.encrypt('Hi There', CryptoJS.MD5('Jefe')).toString())
      expect(CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.RabbitLegacy, 'Hi There', 'Jefe').toString())
        .assertEqual(CryptoJS.RabbitLegacy.encrypt('Hi There', 'Jefe').toString())

      // Restore random method
      randomFun(CryptoJS.lib.WordArray,random);
    })

  })
}