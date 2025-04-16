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
import { CiphertextFn, CiphertextSaltFn, MultiplyHasSaltData,
  MultiplyHasSaltNoCipherParamsData } from './interface/MultiplyData'

export default function formatOpensslTest() {
  let data:MultiplyHasSaltData | null = null
  let setUpErr:Error | null = null;
  describe('formatOpensslTest', ()=> {
    beforeAll(()=> {
      try {
        if (data) {
          data.ciphertext = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
          data.salt = CryptoJS.lib.WordArray.create([0x01234567, 0x89abcdef]);
        }
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('formatOpensslTest_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.ciphertext).not().assertNull()
        expect(data.salt).not().assertNull()
      }
    })

    it('formatOpensslTest_testSaltedToString', 0, ()=> {
      let localErr:Error | null = null;
      try {
        if (data) {
          expect(CryptoJS.enc.Latin1.parse('Salted__')
            .concat(data.salt)
            .concat(data.ciphertext)
            .toString(CryptoJS.enc.Base64)).assertEqual(CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create(CiphertextSaltFn(
            data.ciphertext,data.salt))))
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()

    })

    it('formatOpensslTest_testUnsaltedToString', 0, ()=> {
      let localErr:Error | null = null;
      try {
        if (data) {
          expect(data.ciphertext.toString(CryptoJS.enc.Base64))
            .assertEqual(CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create(CiphertextFn(data.ciphertext))))
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })
    it('formatOpensslTest_testSaltedFromString', 0, ()=> {
      let localErr:Error | null = null;
      try {
        if (data) {
          let openSSLStr:string = CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create(CiphertextSaltFn(data.ciphertext,data.salt)));
          let cipherParams:CryptoJS.lib.CipherParams = CryptoJS.format.OpenSSL.parse(openSSLStr);
          expect(data.ciphertext.toString()).assertEqual(cipherParams.ciphertext.toString())
          expect(data.salt.toString()).assertEqual(cipherParams.salt.toString())
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })
    it('formatOpensslTest_testUnsaltedFromString', 0, ()=> {
      let localErr:Error | null = null;
      try {
        if (data) {
          let openSSLStr:string = CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create(CiphertextFn(data.ciphertext)));
          let cipherParams:CryptoJS.lib.CipherParams = CryptoJS.format.OpenSSL.parse(openSSLStr);
          expect(data.ciphertext.toString()).assertEqual(cipherParams.ciphertext.toString())
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })
  })
}