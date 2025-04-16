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

export default function encUtf8Test() {
  describe('encUtf8Test', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })
    it('encUtf8Test_testStringify1', 0, ()=> {
      expect('$').assertEqual(CryptoJS.enc.Utf8.stringify(CryptoJS.lib.WordArray.create([0x24000000], 1)))
    })
    it('encUtf8Test_testStringify2', 0, ()=> {
      expect('¢')
        .assertEqual(CryptoJS.enc.Utf8.stringify(CryptoJS.lib.WordArray.create([0xc2a20000], 2)))
    })
    it('encUtf8Test_testStringify3', 0, ()=> {
      expect('€')
        .assertEqual(CryptoJS.enc.Utf8.stringify(CryptoJS.lib.WordArray.create([0xe282ac00], 3)))
    })
    it('encUtf8Test_testStringify4', 0, ()=> {
      expect('𤭢')
        .assertEqual(CryptoJS.enc.Utf8.stringify(CryptoJS.lib.WordArray.create([0xf0a4ada2], 4)))
    })
    it('encUtf8Test_testParse1', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x24000000], 1).toString())
        .assertEqual(CryptoJS.enc.Utf8.parse('$').toString())
    })
    it('encUtf8Test_testParse2', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0xc2a20000], 2).toString())
        .assertEqual(CryptoJS.enc.Utf8.parse('¢').toString())
    })
    it('encUtf8Test_testParse3', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0xe282ac00], 3).toString())
        .assertEqual(CryptoJS.enc.Utf8.parse('€').toString())
    })
    it('encUtf8Test_testParse4', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0xf0a4ada2], 4).toString())
        .assertEqual(CryptoJS.enc.Utf8.parse('𤭢').toString())
    })
  })
}