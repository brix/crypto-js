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

export default function ripemd160Test() {
  describe('ripemd160Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('ripemd160Test_testVector1', 0, ()=> {
      expect('37f332f68db77bd9d7edd4969571ad671cf9dd3b')
        .assertEqual(CryptoJS.RIPEMD160('The quick brown fox jumps over the lazy dog').toString())
    })
    it('ripemd160Test_testVector2', 0, ()=> {
      expect('132072df690933835eb8b6ad0b77e7b6f14acad7')
        .assertEqual(CryptoJS.RIPEMD160('The quick brown fox jumps over the lazy cog').toString())
    })
    it('ripemd160Test_testVector3', 0, ()=> {
      expect('9c1185a5c5e9fc54612808977ee8f548b2258d31')
        .assertEqual(CryptoJS.RIPEMD160('').toString())
    })
  })
}