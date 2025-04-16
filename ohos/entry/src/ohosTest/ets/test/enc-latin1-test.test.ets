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

export default function encLatin1Test() {
  describe('encLatin1Test', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })
    it('encLatin1Test_testStringify', 0, ()=> {
      expect('\x12\x34\x56\x78').assertEqual(CryptoJS.enc.Latin1.stringify(CryptoJS.lib.WordArray.create([0x12345678])))
    })
    it('encLatin1Test_testParse', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x12345678]).toString())
        .assertEqual(CryptoJS.enc.Latin1.parse('\x12\x34\x56\x78').toString())
    })
  })
}