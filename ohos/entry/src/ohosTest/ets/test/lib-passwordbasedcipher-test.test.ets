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

export default function libPasswordbasedcipherTest() {
  describe('libPasswordbasedcipherTest',  ()=> {
    beforeAll( ()=> {

    })
    beforeEach( ()=> {
    })

    it('libPasswordbasedcipherTest_testEncrypt', 0,  ()=> {
      // Compute actual
      let actual:CryptoJS.lib.CipherParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, 'Hello, World!', 'password');

      let expected:CryptoJS.lib.WordArray = CryptoJS.algo.AES.createEncryptor(actual.key,{
        iv: actual.iv
      }).finalize('Hello, World!');

      expect(expected.toString()).assertEqual(actual.ciphertext.toString())
    })

    it('libPasswordbasedcipherTest_testDecrypt', 0,  ()=> {
      let ciphertext:CryptoJS.lib.CipherParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, 'Hello, World!', 'password');

      expect('Hello, World!').assertEqual(CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertext, 'password').toString(CryptoJS.enc.Utf8))
    })

  })
}