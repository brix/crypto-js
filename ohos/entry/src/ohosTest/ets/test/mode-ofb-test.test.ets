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
import { Data, Key, Iv } from './interface/interface';
import { IVModePaddingFn } from './interface/ModePaddingData';

export default function modeOfbTest() {
  let data:Data | null = null
  let setUpErr:Error | null = null;
  describe('modeOfbTest', ()=> {
    beforeAll(()=> {
      try {
        if (data) {
          // data = {};

          data.message = CryptoJS.lib.WordArray.create([
            0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
            0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f
          ]);
          data.key = CryptoJS.lib.WordArray.create([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
          data.iv = CryptoJS.lib.WordArray.create([0x30313233, 0x34353637, 0x38393a3b, 0x3c3d3e3f]);
        }
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('modeOfbTest_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.key).not().assertNull()
        expect(data.iv).not().assertNull()
        expect(data.message).not().assertNull()
      }
    })

    it('modeOfbTest_testEncryptor', 0, ()=> {
      // Compute expected
      if (!!data) {
        if (!!data.message) {
          let expected: CryptoJS.lib.WordArray = data.message.clone();

          // First block XORed with encrypted IV
          if (data.iv) {
            CryptoJS.algo.AES.createEncryptor(data.key).encryptBlock(data.iv.words.slice(0), 0);
          }
          for (let i = 0; i < 4; i++) {
            if (data.iv) {
              expected.words[i] ^= data.iv.words.slice(0)[i];
            }
          }

          if (data.iv) {
            CryptoJS.algo.AES.createEncryptor(data.key).encryptBlock(data.iv.words.slice(0), 0);
          }
          for (let i = 4; i < 8; i++) {
            if (data.iv) {
              expected.words[i] ^= data.iv.words.slice(0)[i % 4];
            }
          }

          // Compute actual
          let actual:CryptoJS.lib.WordArray = CryptoJS.AES.encrypt(data.message, data.key, IVModePaddingFn(data.iv,CryptoJS.mode.OFB, CryptoJS.pad.NoPadding)).ciphertext;

          // Test
          expect(expected.toString()).assertEqual(actual.toString())
        }
      }
    })

    it('modeOfbTest_testDecryptor', 0, ()=> {
      if (data) {
        let encrypted:CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(data.message, data.key, IVModePaddingFn(data.iv,CryptoJS.mode.OFB, CryptoJS.pad.NoPadding));
        let decrypted:CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(encrypted, data.key,  IVModePaddingFn(data.iv,CryptoJS.mode.OFB, CryptoJS.pad.NoPadding));

        if(data.message){
          expect(data.message.toString()).assertEqual(decrypted.toString())
        }
      }
    })

  })
}