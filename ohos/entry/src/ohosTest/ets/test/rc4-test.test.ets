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

export default function rc4Test() {
  describe('rc4Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('rc4Test_testVector1', 0, ()=> {
      expect('7494c2e7104b0879')
        .assertEqual(CryptoJS.RC4.encrypt(CryptoJS.enc.Hex.parse('0000000000000000'), CryptoJS.enc.Hex.parse('0123456789abcdef'))
          .ciphertext
          .toString())
    })
    it('rc4Test_testVector2', 0, ()=> {
      expect('f13829c9de')
        .assertEqual(CryptoJS.RC4.encrypt(CryptoJS.enc.Hex.parse('dcee4cf92c'), CryptoJS.enc.Hex.parse('618a63d2fb')).ciphertext.toString())
    })
    let dropArg:Record<string,number>={
    'drop': 2
    }
    it('rc4Test_testDrop', 0, ()=> {
      expect(CryptoJS.RC4.encrypt(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'), CryptoJS.enc.Hex.parse('0123456789abcdef'))
        .ciphertext
        .toString()
        .substr(16))
        .assertEqual(CryptoJS.RC4Drop.encrypt(CryptoJS.enc.Hex.parse('0000000000000000'), CryptoJS.enc.Hex.parse('0123456789abcdef'), dropArg).ciphertext.toString())
    })
    it('rc4Test_testMultiPart', 0, ()=> {
      let rc4:CryptoJS.Cipher = Utils.getRC4CreateEncryptor()

      let ciphertext1:string = rc4.process(CryptoJS.enc.Hex.parse('00000000')).toString();
      let ciphertext2:string = rc4.process(CryptoJS.enc.Hex.parse('0000')).toString();
      let ciphertext3:string = rc4.process(CryptoJS.enc.Hex.parse('0000')).toString();
      let ciphertext4:string = rc4.finalize().toString();

      expect('7494c2e7104b0879')
        .assertEqual(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
    })
    it('rc4Test_testInputIntegrity1', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0000000000000000');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0123456789abcdef');

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();

      CryptoJS.RC4.encrypt(message, key);

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
    })
    it('rc4Test_testInputIntegrity2', 0, ()=> {
      // Save original random method
      let random:(nBytes: number) => CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random;

      // Replace random method with one that returns a predictable value
      createRandomFun(CryptoJS.lib.WordArray)

      // Test
      expect(CryptoJS.algo.RC4.createEncryptor(CryptoJS.SHA256('Jefe'))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.RC4.encrypt('Hi There', CryptoJS.SHA256('Jefe')).ciphertext.toString())
      expect(CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.RC4, 'Hi There', CryptoJS.SHA256('Jefe')).toString())
        .assertEqual(CryptoJS.RC4.encrypt('Hi There', CryptoJS.SHA256('Jefe')).toString())
      expect(CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.RC4, 'Hi There', 'Jefe').toString())
        .assertEqual(CryptoJS.RC4.encrypt('Hi There', 'Jefe').toString())

      // Restore random method
      randomFun(CryptoJS.lib.WordArray,random);
    })


  })
}