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
import { ModePaddingFn } from './interface/ModePaddingData'
import { Utils,randomFun,createRandomFun } from './interface/Utils'

interface CiphertextData{
  ciphertext:object
}

let ciphertextFn = (ciphertext:object):CiphertextData => {
  let ciphertextFnData:CiphertextData = {
    ciphertext: ciphertext,
  }
  return ciphertextFnData
}

export default function aesTest() {
  describe('aesTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })

    it('aesTest_testEncryptKeySize128', 0, ()=> {
      let result:string = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'),ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).ciphertext.toString()
      expect('69c4e0d86a7b0430d8cdb78070b4c55a').assertEqual(result)
    })
    it('aesTest_testEncryptKeySize192', 0, ()=> {
      let result:string = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).ciphertext.toString()
      expect('dda97ca4864cdfe06eaf70a0ec0d7191').assertEqual(result)
    })

    it('aesTest_testEncryptKeySize256', 0, ()=> {
      let result:string = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).ciphertext.toString();
      expect('8ea2b7ca516745bfeafc49904b496089').assertEqual(result)
    })

    it('aesTest_testDecryptKeySize128', 0, ()=> {
      let result:string = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextFn(CryptoJS.enc.Hex.parse('69c4e0d86a7b0430d8cdb78070b4c55a'))), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).toString();
      expect('00112233445566778899aabbccddeeff').assertEqual(result)
    })

    it('aesTest_testDecryptKeySize192', 0, ()=> {
      let result:string = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextFn(CryptoJS.enc.Hex.parse('dda97ca4864cdfe06eaf70a0ec0d7191'))), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).toString();
      expect('00112233445566778899aabbccddeeff').assertEqual(result)
    })

    it('aesTest_testDecryptKeySize256', 0, ()=> {
      let result:string = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextFn(CryptoJS.enc.Hex.parse('8ea2b7ca516745bfeafc49904b496089'))), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'),ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).toString();
      expect('00112233445566778899aabbccddeeff').assertEqual(result)
    })
    it('aesTest_testMultiPart', 0, ()=> {
      let aes:CryptoJS.Cipher = Utils.getModePaddingFn()

      let ciphertext1:string = aes.process(CryptoJS.enc.Hex.parse('001122334455')).toString();
      let ciphertext2:string = aes.process(CryptoJS.enc.Hex.parse('66778899aa')).toString();
      let ciphertext3:string = aes.process(CryptoJS.enc.Hex.parse('bbccddeeff')).toString();
      let ciphertext4:string = aes.finalize().toString();
      let result = ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()
      expect('69c4e0d86a7b0430d8cdb78070b4c55a').assertEqual(result)
    })
    it('aesTest_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
      let iv:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();
      let expectedIv:string = iv.toString();

      CryptoJS.AES.encrypt(message, key, {
        'iv': iv
      });

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
      expect(expectedIv).assertEqual(iv.toString())
    })
    it('aesTest_testHelper', 0, ()=> {
      // Save original random method
      let random:(nBytes: number) => CryptoJS.lib.WordArray= CryptoJS.lib.WordArray.random;

      // Replace random method with one that returns a predictable value
      createRandomFun(CryptoJS.lib.WordArray)
      // Test
      expect(CryptoJS.algo.AES.createEncryptor(CryptoJS.SHA256('Jefe'),ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.AES.encrypt('Hi There', CryptoJS.SHA256('Jefe'),ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).ciphertext.toString())

      expect(CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, 'Hi There', CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).toString()).assertEqual(CryptoJS.AES.encrypt('Hi There', CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).toString())
      expect(CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, 'Hi There', 'Jefe',ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).toString()).assertEqual(CryptoJS.AES.encrypt('Hi There', 'Jefe', ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).toString())
      
      // Restore random method
      randomFun(CryptoJS.lib.WordArray,random)
    })

  })
}