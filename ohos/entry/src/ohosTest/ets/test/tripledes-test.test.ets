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

export default function tripledesTest() {
  describe('tripledesTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=>{
    })

    let modelPad:Record<string,ESObject>={
      'mode': CryptoJS.mode.ECB, 'padding': CryptoJS.pad.NoPadding
    }
    it('tripledesTest_testEncrypt1', 0, ()=> {
      expect('95a8d72813daa94d')
        .assertEqual(CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.parse('0000000000000000'), CryptoJS.enc.Hex.parse('800101010101010180010101010101018001010101010101'), modelPad).ciphertext.toString())
    })
    it('tripledesTest_testEncrypt2', 0, ()=> {
      expect('869efd7f9f265a09')
        .assertEqual(CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.parse('0000000000000000'), CryptoJS.enc.Hex.parse('010101010101010201010101010101020101010101010102'),modelPad).ciphertext.toString())
    })
    it('tripledesTest_testEncrypt3', 0,()=> {
      expect('95f8a5e5dd31d900')
        .assertEqual(CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.parse('8000000000000000'), CryptoJS.enc.Hex.parse('010101010101010101010101010101010101010101010101'), modelPad).ciphertext.toString())
    })
    it('tripledesTest_testEncrypt4', 0, ()=> {
      expect('166b40b44aba4bd6')
        .assertEqual(CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.parse('0000000000000001'), CryptoJS.enc.Hex.parse('010101010101010101010101010101010101010101010101'), modelPad).ciphertext.toString())
    })

    it('tripledesTest_testDecrypt1', 0, ()=> {

      let ciphertextJS:Record<string,CryptoJS.lib.WordArray>={
        'ciphertext': CryptoJS.enc.Hex.parse('95a8d72813daa94d')
      }
      expect('0000000000000000')
        .assertEqual(CryptoJS.TripleDES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextJS), CryptoJS.enc.Hex.parse('800101010101010180010101010101018001010101010101'), modelPad).toString())
    })
    it('tripledesTest_testDecrypt2', 0, ()=> {

      let ciphertextJS:Record<string,CryptoJS.lib.WordArray>={
        'ciphertext': CryptoJS.enc.Hex.parse('869efd7f9f265a09')
      }
      expect('0000000000000000')
        .assertEqual(CryptoJS.TripleDES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextJS), CryptoJS.enc.Hex.parse('010101010101010201010101010101020101010101010102'),modelPad).toString())
    })
    it('tripledesTest_testDecrypt3', 0, ()=> {
      let ciphertextJS:Record<string,CryptoJS.lib.WordArray>={
        'ciphertext': CryptoJS.enc.Hex.parse('95f8a5e5dd31d900')
      }
      expect('8000000000000000')
        .assertEqual(CryptoJS.TripleDES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextJS), CryptoJS.enc.Hex.parse('010101010101010101010101010101010101010101010101'), modelPad).toString())
    })
    it('tripledesTest_testDecrypt4', 0, ()=> {
      let ciphertextJS:Record<string,CryptoJS.lib.WordArray>={
        'ciphertext': CryptoJS.enc.Hex.parse('166b40b44aba4bd6')
      }
      expect('0000000000000001')
        .assertEqual(CryptoJS.TripleDES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextJS), CryptoJS.enc.Hex.parse('010101010101010101010101010101010101010101010101'), modelPad).toString())
    })

    it('tripledesTest_testMultiPart', 0, ()=> {
      let des:CryptoJS.Cipher = Utils.getHexModelPad()

      let ciphertext1:string = des.process(CryptoJS.enc.Hex.parse('001122334455')).toString();
      let ciphertext2:string = des.process(CryptoJS.enc.Hex.parse('66778899aa')).toString();
      let ciphertext3:string = des.process(CryptoJS.enc.Hex.parse('bbccddeeff')).toString();
      let ciphertext4:string = des.finalize().toString();

      expect(CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), modelPad).ciphertext.toString())
        .assertEqual(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
    })

    it('tripledesTest_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
      let iv:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('08090a0b0c0d0e0f');

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();
      let expectedIv:string = iv.toString();

      let msgKey:Record<string,CryptoJS.lib.WordArray>={
        'iv': iv
      }
      CryptoJS.TripleDES.encrypt(message, key, msgKey);

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
      expect(expectedIv).assertEqual(iv.toString())
    })

    let ECB:Record<string,CryptoJS.BlockCipherMode>={
      'mode': CryptoJS.mode.ECB
    }
    it('tripledesTest_test64BitKey', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0011223344556677');
      let extendedKey:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('001122334455667700112233445566770011223344556677')

      let output1:string = CryptoJS.TripleDES.encrypt(message, key, ECB).toString();
      let output2:string = CryptoJS.TripleDES.encrypt(message, extendedKey, ECB).toString();

      expect(output1).assertEqual(output2)
    })
    it('tripledesTest_test128BitKey', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff');
      let extendedKey:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff0011223344556677')

      let output1:string = CryptoJS.TripleDES.encrypt(message, key, ECB).toString();
      let output2:string = CryptoJS.TripleDES.encrypt(message, extendedKey,ECB).toString();

      expect(output1).assertEqual(output2)
    })
    it('tripledesTest_test256BitKey', 0, ()=> {
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff0112233445566778899aabbccddeeff0');

      expect(CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), key, ECB).toString())
        .assertEqual(CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'),
          CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff0112233445566778'), ECB).toString())
    })
    it('tripledesTest_testHelper', 0, ()=> {
      // Save original random method
      let random:(nBytes: number) =>CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random;

      // Replace random method with one that returns a predictable value
      createRandomFun(CryptoJS.lib.WordArray)

      let cModel: Record<string,ESObject> = {
          'mode': CryptoJS.mode.ECB,
          'padding': CryptoJS.pad.NoPadding
      }
      // Test
      expect(CryptoJS.algo.TripleDES.createEncryptor(CryptoJS.SHA256('Jefe'),cModel)
        .finalize('Hi There')
        .toString())
        .assertEqual(CryptoJS.TripleDES.encrypt('Hi There', CryptoJS.SHA256('Jefe'), cModel).ciphertext.toString())
      expect(CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.TripleDES, 'Hi There', CryptoJS.SHA256('Jefe'), cModel).toString())
        .assertEqual(CryptoJS.TripleDES.encrypt('Hi There', CryptoJS.SHA256('Jefe'),cModel).toString())
      expect(CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.TripleDES, 'Hi There', 'Jefe', cModel).toString())
        .assertEqual(CryptoJS.TripleDES.encrypt('Hi There', 'Jefe', cModel).toString())

      // Restore random method
      randomFun(CryptoJS.lib.WordArray,random);


    })
  })
}