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
import { HasherFn, SaltABData, SaltABFn, SaltAFn, SaltBFn, SaltHasherFn, Utils } from './interface/Utils'



export default function configTest() {
  let data:SaltABData | null = null
  let setUpErr:Error | null = null;
  describe('configTest', ()=> {
    beforeAll(()=> {
      try {
        data = SaltABFn(CryptoJS.enc.Hex.parse('AA00000000000000'),CryptoJS.enc.Hex.parse('BB00000000000000'));
        console.log(`zdy---saltA--->${data.saltA}`);
        console.log(`zdy---saltB--->${data.saltB}`);
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('configTest_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.saltA).not().assertNull()
        expect(data.saltB).not().assertNull()
      }
    })

    it('configTest_testEncrypt', 0, ()=> {
      let localErr:Error | null = null;
      try {
        if (data) {
          let encryptedA:CryptoJS.lib.CipherParams = Utils.getEncryptSaltA(data)
          let encryptedB:CryptoJS.lib.CipherParams = Utils.getEncryptSaltB(data)

          let encry1:string = encryptedA.toString()
          let encry2:string = encryptedA.toString()
          expect(encry1).assertEqual(encry2)

          let encry3:string = encryptedA.toString()
          let encry4:string = encryptedB.toString()
          expect(encry3).not().assertEqual(encry4)
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()

    })

    it('configTest_testDecrypt', 0, ()=> {
      let localErr:Error | null = null;

      try {
        if (data) {
          let encryptedA:CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt('Test', 'Pass', SaltAFn(data.saltA));
          let encryptedB:CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt('Test', 'Pass', SaltBFn(data.saltB));
          expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedA, 'Pass').toString(CryptoJS.enc.Utf8))
          expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedB, 'Pass').toString(CryptoJS.enc.Utf8))
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })
    it('configTest_testCustomKDFHasher', 0, ()=> {
      let localErr:Error | null = null;
      try {

        if (data) {
          //SHA1
          // let encryptedSHA1:string = CryptoJS.AES.encrypt('Test', 'Pass', SaltHasherFn(data.saltA,CryptoJS.algo.SHA1)).toString();
          // expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedSHA1, 'Pass', HasherFn(CryptoJS.algo.SHA1)).toString(CryptoJS.enc.Utf8))
          //
          // //SHA256
          // let encryptedSHA256:string = CryptoJS.AES.encrypt('Test', 'Pass', SaltHasherFn(data.saltA, CryptoJS.algo.SHA256)).toString();
          // expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedSHA256, 'Pass',HasherFn(CryptoJS.algo.SHA256)).toString(CryptoJS.enc.Utf8))
          //
          // //SHA512
          // let encryptedSHA512:string = CryptoJS.AES.encrypt('Test', 'Pass',SaltHasherFn(data.saltA, CryptoJS.algo.SHA512)).toString();
          // expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedSHA512, 'Pass', HasherFn(CryptoJS.algo.SHA512)).toString(CryptoJS.enc.Utf8))
          //
          // //Default: MD5
          // let encryptedDefault:string = CryptoJS.AES.encrypt('Test', 'Pass', SaltAFn(data.saltA)).toString();
          // let encryptedMD5:string = CryptoJS.AES.encrypt('Test', 'Pass', SaltHasherFn(data.saltA, CryptoJS.algo.MD5)).toString();
          // expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedMD5, 'Pass', HasherFn(CryptoJS.algo.MD5)).toString(CryptoJS.enc.Utf8))
          //SHA1
          let encryptedSHA1:string = CryptoJS.AES.encrypt('Test', 'Pass', {

            salt: data.saltA, hasher: CryptoJS.algo.SHA1
          }).toString();
          expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedSHA1, 'Pass', {
            hasher: CryptoJS.algo.SHA1
          }).toString(CryptoJS.enc.Utf8))

          //SHA256
          let encryptedSHA256:string = CryptoJS.AES.encrypt('Test', 'Pass', {
            salt: data.saltA, hasher: CryptoJS.algo.SHA256
          }).toString();
          expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedSHA256, 'Pass', {
            hasher: CryptoJS.algo.SHA256
          }).toString(CryptoJS.enc.Utf8))

          //SHA512
          let encryptedSHA512:string = CryptoJS.AES.encrypt('Test', 'Pass', {
            salt: data.saltA, hasher: CryptoJS.algo.SHA512
          }).toString();
          expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedSHA512, 'Pass', {
            hasher: CryptoJS.algo.SHA512
          }).toString(CryptoJS.enc.Utf8))

          //Default: MD5
          let encryptedDefault:string = CryptoJS.AES.encrypt('Test', 'Pass', {
            salt: data.saltA
          }).toString();
          let encryptedMD5:string = CryptoJS.AES.encrypt('Test', 'Pass', {

            salt: data.saltA, hasher: CryptoJS.algo.MD5
          }).toString();
          expect('Test').assertEqual(CryptoJS.AES.decrypt(encryptedMD5, 'Pass', {
            hasher: CryptoJS.algo.MD5
          }).toString(CryptoJS.enc.Utf8))
          expect(encryptedDefault).assertEqual(encryptedMD5)

          //Different KDFHasher
          expect(encryptedDefault).not().assertEqual(encryptedSHA1)
          expect(encryptedDefault).not().assertEqual(encryptedSHA256)
          expect(encryptedDefault).not().assertEqual(encryptedSHA512)
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

  })
}