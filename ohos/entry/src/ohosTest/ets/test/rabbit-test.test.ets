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

export default function rabbitTest() {
  describe('rabbitTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('rabbitTest_testVector1', 0, ()=> {
      expect('02f74a1c26456bf5ecd6a536f05457b1')
        .assertEqual(CryptoJS.Rabbit.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('00000000000000000000000000000000'))
          .ciphertext
          .toString())
    })
    it('rabbitTest_testVector2', 0, ()=> {
      expect('3d02e0c730559112b473b790dee018df')
        .assertEqual(CryptoJS.Rabbit.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('c21fcf3881cd5ee8628accb0a9890df8'))
          .ciphertext
          .toString())
    })
    it('rabbitTest_testVector3', 0, ()=> {
      expect('a3a97abb80393820b7e50c4abb53823d')
        .assertEqual(CryptoJS.Rabbit.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('1d272c6a2d8e3dfcac14056b78d633a0'))
          .ciphertext
          .toString())
    })
    let ivEncVector4:Record<string,CryptoJS.lib.WordArray>={
      'iv': CryptoJS.enc.Hex.parse('0d74db42a91077de')
    }
    it('rabbitTest_testVector4', 0, ()=> {
      expect('75d186d6bc6905c64f1b2dfdd51f7bfc')
        .assertEqual(CryptoJS.Rabbit.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('0053a6f94c9ff24598eb3e91e4378add'), ivEncVector4).ciphertext.toString())
    })
    let ivEncVector5:Record<string,CryptoJS.lib.WordArray>={
      'iv': CryptoJS.enc.Hex.parse('167de44bb21980e7')
    }
    it('rabbitTest_testVector5', 0, ()=> {
      expect('476e2750c73856c93563b5f546f56a6a')
        .assertEqual(CryptoJS.Rabbit.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('0558abfe51a4f74a9df04396e93c8fe2'), ivEncVector5).ciphertext.toString())
    })
    let ivEncVector6:Record<string,CryptoJS.lib.WordArray>={
      'iv': CryptoJS.enc.Hex.parse('1f86ed54bb2289f0')
    }
    it('rabbitTest_testVector6', 0, ()=> {
      expect('921fcf4983891365a7dc901924b5e24b')
        .assertEqual(CryptoJS.Rabbit.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('0a5db00356a9fc4fa2f5489bee4194e7'), ivEncVector6).ciphertext.toString())
    })
    let ivEncVector7:Record<string,CryptoJS.lib.WordArray>={
      'iv': CryptoJS.enc.Hex.parse('288ff65dc42b92f9')
    }
    it('rabbitTest_testVector7', 0,()=> {
      expect('613cb0ba96aff6cacf2a459a102a7f78')
        .assertEqual(CryptoJS.Rabbit.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('0f62b5085bae0154a7fa4da0f34699ec'), ivEncVector7).ciphertext.toString())
    })
    it('rabbitTest_testMultiPart', 0, ()=> {
      let rabbit:CryptoJS.Cipher = Utils.getRabbit()

      let ciphertext1:string = rabbit.process(CryptoJS.enc.Hex.parse('000000000000')).toString();
      let ciphertext2:string = rabbit.process(CryptoJS.enc.Hex.parse('0000000000')).toString();
      let ciphertext3:string = rabbit.process(CryptoJS.enc.Hex.parse('0000000000')).toString();
      let ciphertext4:string = rabbit.finalize().toString();

      expect('02f74a1c26456bf5ecd6a536f05457b1')
        .assertEqual(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
    })
    it('rabbitTest_testInputIntegrity1', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
      let iv:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0000000000000000');

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();
      let expectedIv:string = iv.toString();

      let IV:Record<string,CryptoJS.lib.WordArray>={
      'iv': iv
      }
      CryptoJS.Rabbit.encrypt(message, key, IV);

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
      expect(expectedIv).assertEqual(iv.toString())
    })
    it('rabbitTest_testInputIntegrity2', 0, ()=> {
      let random:(nBytes: number) => CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random;

      // Replace random method with one that returns a predictable value
      createRandomFun(CryptoJS.lib.WordArray)

      // Test
      expect(CryptoJS.algo.Rabbit.createEncryptor(CryptoJS.MD5('Jefe'))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.Rabbit.encrypt('Hi There', CryptoJS.MD5('Jefe')).ciphertext.toString())
      expect(CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.Rabbit, 'Hi There', CryptoJS.MD5('Jefe')).toString())
        .assertEqual(CryptoJS.Rabbit.encrypt('Hi There', CryptoJS.MD5('Jefe')).toString())
      expect(CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.Rabbit, 'Hi There', 'Jefe').toString())
        .assertEqual(CryptoJS.Rabbit.encrypt('Hi There', 'Jefe').toString())

      // Restore random method
      randomFun(CryptoJS.lib.WordArray,random);


    })


  })
}