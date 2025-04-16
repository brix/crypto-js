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
import { Data } from './interface/interface';
import { ModePaddingFn } from './interface/ModePaddingData';

export default function modeEcbTest() {
  let data:Data | null = null
  let setUpErr:Error | null = null;
  describe('modeEcbTest', ()=> {
    beforeAll(()=> {
      try {
        if (data) {
          // data = {};

          data!.message = CryptoJS.lib.WordArray.create([
            0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
            0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f
          ]);
          data!.key = CryptoJS.lib.WordArray.create([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
        }
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('modeEcbTest_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data!.key).not().assertNull()
        expect(data!.message).not().assertNull()
      }
    })

    it('modeEcbTest_testEncryptor', 0, ()=> {

      if (data) {
        // Compute expected
        CryptoJS.algo.AES.createEncryptor(data!.key).encryptBlock(data.
        message.
        clone().
        words, 0);
        CryptoJS.algo.AES.createEncryptor(data!.key).encryptBlock(data!.message.clone().words, 4);

        // Compute actual

        let actual:CryptoJS.lib.WordArray = CryptoJS.AES.encrypt(data!.message, data!.key, ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding)).ciphertext;

        // Test
        expect(data!.message.clone().toString()).assertEqual(actual.toString())
      }
    })

    it('modeEcbTest_testDecryptor', 0, ()=> {
      if (data) {
        let encrypted:CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(data!.message, data!.key, ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding));
        let decrypted:CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(encrypted, data!.key, ModePaddingFn(CryptoJS.mode.ECB,CryptoJS.pad.NoPadding));
        expect(data.message.toString()).assertEqual(decrypted.toString())

      }

    })

  })
}