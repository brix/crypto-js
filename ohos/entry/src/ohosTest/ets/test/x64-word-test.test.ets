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

export default function x64WordTest() {
  describe('x64WordTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('x64WordTest_testInit', 0, ()=> {
      expect(0x00010203).assertEqual(CryptoJS.x64.Word.create(0x00010203, 0x04050607).high)
      expect(0x04050607).assertEqual(CryptoJS.x64.Word.create(0x00010203, 0x04050607).low)
    })
  })
}