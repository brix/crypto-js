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

export default function encHexTest() {
  describe('encHexTest', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })
    it('encHexTest_testStringify', 0, ()=> {
      expect('12345678').assertEqual(CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create([0x12345678])))
    })
    it('encHexTest_testParse', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x12345678]).toString()).assertEqual(CryptoJS.enc.Hex.parse('12345678').toString())
    })
  })
}