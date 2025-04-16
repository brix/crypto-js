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
import { Key } from './interface/interface'
import { ModePaddingFn } from './interface/ModePaddingData'
import { randomFun, Utils,createRandomFun } from './interface/Utils'

export default function desTest() {
  describe('desTest',  ()=> {
    beforeAll( ()=> {
    })
    beforeEach( ()=> {
    })

    it('desTest_testEncrypt1', 0,  ()=> {
      expect('95a8d72813daa94d')
        .assertEqual(CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse('0000000000000000'), CryptoJS.enc.Hex.parse('8000000000000000'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())
    })
    it('desTest_testEncrypt2', 0,  ()=> {
      expect('1de5279dae3bed6f')
        .assertEqual(CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse('0000000000000000'), CryptoJS.enc.Hex.parse('0000000000002000'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())
    })

    it('desTest_testEncrypt3', 0,  ()=> {
      expect('1d1ca853ae7c0c5f')
        .assertEqual(CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse('0000000000002000'), CryptoJS.enc.Hex.parse('0000000000000000'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())
    })
    it('desTest_testEncrypt4', 0,  ()=> {
      expect('ac978c247863388f')
        .assertEqual(CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse('3232323232323232'), CryptoJS.enc.Hex.parse('3232323232323232'),ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())
    })

    it('desTest_testEncrypt5', 0,  ()=> {
      expect('3af1703d76442789')
        .assertEqual(CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse('6464646464646464'), CryptoJS.enc.Hex.parse('6464646464646464'),ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())
    })

    it('desTest_testEncrypt6', 0,  ()=> {
      expect('a020003c5554f34c')
        .assertEqual(CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse('9696969696969696'), CryptoJS.enc.Hex.parse('9696969696969696'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())
    })
    let ciphertextecrypt1Arg:Record<string,CryptoJS.lib.WordArray>={
      'ciphertext': CryptoJS.enc.Hex.parse('95a8d72813daa94d')
    }
    it('desTest_testDecrypt1', 0,  ()=> {
      expect('0000000000000000')
        .assertEqual(CryptoJS.DES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextecrypt1Arg), CryptoJS.enc.Hex.parse('8000000000000000'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())
    })
    let ciphertextecrypt2Arg:Record<string,CryptoJS.lib.WordArray>={
      'ciphertext': CryptoJS.enc.Hex.parse('1de5279dae3bed6f')
    }
    it('desTest_testDecrypt2', 0,  ()=> {
      expect('0000000000000000')
        .assertEqual(CryptoJS.DES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextecrypt2Arg), CryptoJS.enc.Hex.parse('0000000000002000'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())
    })
    let ciphertextecrypt3Arg:Record<string,CryptoJS.lib.WordArray>={
      'ciphertext': CryptoJS.enc.Hex.parse('1d1ca853ae7c0c5f')
    }
    it('desTest_testDecrypt3', 0,  ()=> {
      expect('0000000000002000')
        .assertEqual(CryptoJS.DES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextecrypt3Arg), CryptoJS.enc.Hex.parse('0000000000000000'),ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())
    })
    let ciphertextecrypt4Arg:Record<string,CryptoJS.lib.WordArray>={
      'ciphertext': CryptoJS.enc.Hex.parse('ac978c247863388f')
    }
    it('desTest_testDecrypt4', 0,  ()=> {
      expect('3232323232323232')
        .assertEqual(CryptoJS.DES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextecrypt4Arg), CryptoJS.enc.Hex.parse('3232323232323232'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())
    })
    let ciphertextecrypt5Arg:Record<string,CryptoJS.lib.WordArray>={
      'ciphertext': CryptoJS.enc.Hex.parse('3af1703d76442789')
    }
    it('desTest_testDecrypt5', 0,  ()=> {
      expect('6464646464646464')
        .assertEqual(CryptoJS.DES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextecrypt5Arg), CryptoJS.enc.Hex.parse('6464646464646464'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())
    })

    let ciphertextArg:Record<string,CryptoJS.lib.WordArray>={
      'ciphertext': CryptoJS.enc.Hex.parse('a020003c5554f34c')
    }
    it('desTest_testDecrypt6', 0,  ()=> {
      expect('9696969696969696')
        .assertEqual(CryptoJS.DES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextArg), CryptoJS.enc.Hex.parse('9696969696969696'),ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())
    })
    it('desTest_testMultiPart', 0,  ()=> {
      let modePad:CryptoJS.Cipher = Utils.getAlgoDES()

      let ciphertext1:string = modePad.process(CryptoJS.enc.Hex.parse('001122334455')).toString();
      let ciphertext2:string = modePad.process(CryptoJS.enc.Hex.parse('66778899aa')).toString();
      let ciphertext3:string = modePad.process(CryptoJS.enc.Hex.parse('bbccddeeff')).toString();
      let ciphertext4:string = modePad.finalize().toString();
      expect(CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('0123456789abcdef'),ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())
        .assertEqual(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
    })
    it('desTest_testInputIntegrity', 0,  ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff');
      let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0001020304050607');
      let iv:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('08090a0b0c0d0e0f');

      let expectedMessage:string = message.toString();
      let expectedKey:string = key.toString();
      let expectedIv:string = iv.toString();

      let IVArg:Record<string,CryptoJS.lib.WordArray>={
      'iv': iv
      }
      CryptoJS.DES.encrypt(message, key,IVArg );

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
      expect(expectedIv).assertEqual(iv.toString())
    })
    it('desTest_testHelper', 0,  ()=> {
      // Save original random method
      let random:(nBytes:number)=>CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random;

      // Replace random method with one that returns a predictable value
      createRandomFun(CryptoJS.lib.WordArray)

      // Test
      expect(CryptoJS.algo.DES.createEncryptor(CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.DES.encrypt('Hi There', CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString())

      expect(CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.DES, 'Hi There', CryptoJS.SHA256('Jefe'),ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString()).assertEqual(CryptoJS.DES.encrypt('Hi There', CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())
      expect(CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.DES, 'Hi There', 'Jefe', ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString()).assertEqual(CryptoJS.DES.encrypt('Hi There', 'Jefe', ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString())

      // Restore random method
      randomFun(CryptoJS.lib.WordArray,random);
    })
  })

}