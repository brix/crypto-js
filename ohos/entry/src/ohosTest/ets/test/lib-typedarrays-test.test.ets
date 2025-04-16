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
import { BufferData } from './interface/interface';

export default function libTypedarraysTest() {
  let data:BufferData | null = null
  let setUpErr:Error | null = null;
  describe('libTypedarraysTest', ()=> {
    beforeAll(()=> {
      try {
        if (data) {
          // data = {};
          data.buffer = new ArrayBuffer(8);

          let uint8View = new Uint8Array(data.buffer);
          uint8View[0] = 0x01;
          uint8View[1] = 0x23;
          uint8View[2] = 0x45;
          uint8View[3] = 0x67;
          uint8View[4] = 0x89;
          uint8View[5] = 0xab;
          uint8View[6] = 0xcd;
          uint8View[7] = 0xef;
        }
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('libTypedarraysTest_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.buffer).not().assertNull()
      }
    })
    it('libTypedarraysTest_testInt8Array', 0, ()=> {
      if (data) {
        expect('0123456789abcdef').assertEqual(CryptoJS.lib.WordArray.create(new Int8Array(data.buffer)).toString())
      }
    })
    it('libTypedarraysTest_testUint8Array', 0, ()=> {
      if (data) {
        expect('0123456789abcdef').assertEqual(CryptoJS.lib.WordArray.create(new Uint8Array(data.buffer)).toString())
      }
    })
    it('libTypedarraysTest_testUint8ClampedArray', 0, ()=> {

      if (data) {
        expect('0123456789abcdef').assertEqual(CryptoJS.lib.WordArray.create(new Uint8ClampedArray(data.buffer)).toString())
      }
    })
    it('libTypedarraysTest_testInt16Array', 0, ()=> {
      if (data) {
        expect('0123456789abcdef').assertEqual(CryptoJS.lib.WordArray.create(new Int16Array(data.buffer)).toString())
      }
    })
    it('libTypedarraysTest_testUint16Array', 0, ()=> {
      if (data) {
        expect('0123456789abcdef').assertEqual(CryptoJS.lib.WordArray.create(new Uint16Array(data.buffer)).toString())
      }
    })
    it('libTypedarraysTest_testInt32Array', 0, ()=> {
      if (data) {
        expect('0123456789abcdef').assertEqual(CryptoJS.lib.WordArray.create(new Int32Array(data.buffer)).toString())
      }
    })
    it('libTypedarraysTest_testUint32Array', 0, ()=> {
      if (data) {
        expect('0123456789abcdef').assertEqual(CryptoJS.lib.WordArray.create(new Uint32Array(data.buffer)).toString())
      }
    })
    it('libTypedarraysTest_testPartialView', 0, ()=> {
      if (data) {
        expect('456789ab').assertEqual(CryptoJS.lib.WordArray.create(new Int16Array(data.buffer, 2, 2)).toString())

      }
    })

  })
}