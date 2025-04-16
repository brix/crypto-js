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

export default function x64WordarrayTest() {
  describe('x64WordarrayTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('x64WordarrayTest_testInit0', 0,()=> {
      expect('')
        .assertEqual(CryptoJS.x64.WordArray.create()
          .toX32()
          .toString())
    })
    it('x64WordarrayTest_testInit1', 0, ()=> {

      expect('000102030405060718191a1b1c1d1e1f')
        .assertEqual(CryptoJS.x64.WordArray.create([
        CryptoJS.x64.Word.create(0x00010203, 0x04050607),
        CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
        ]).toX32().toString())
    })
    it('x64WordarrayTest_testInit2', 0, ()=> {
      expect('00010203040506071819')
        .assertEqual(CryptoJS.x64.WordArray.create([
        CryptoJS.x64.Word.create(0x00010203, 0x04050607),
        CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
        ], 10).toX32().toString())
    })
    it('x64WordarrayTest_testToX32', 0, ()=> {
      expect('00010203040506071819').assertEqual(CryptoJS.x64.WordArray.create([
      CryptoJS.x64.Word.create(0x00010203, 0x04050607),
      CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
      ], 10).toX32().toString())
    })
  })
}