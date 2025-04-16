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

export default function encUtf16Test() {
  describe('encUtf16Test', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })
    it('encUtf16Test_testStringify1', 0, ()=> {
      expect('z').assertEqual(CryptoJS.enc.Utf16.stringify(CryptoJS.lib.WordArray.create([0x007a0000], 2)))
    })
    it('encUtf16Test_testStringify2', 0, ()=> {
      expect('水')
        .assertEqual(CryptoJS.enc.Utf16.stringify(CryptoJS.lib.WordArray.create([0x6c340000], 2)))
    })
    it('encUtf16Test_testStringify3', 0, ()=> {
      expect('𐀀')
        .assertEqual(CryptoJS.enc.Utf16.stringify(CryptoJS.lib.WordArray.create([0xd800dc00], 4)))
    })
    it('encUtf16Test_testStringify4', 0, ()=> {
      expect('𝄞')
        .assertEqual(CryptoJS.enc.Utf16.stringify(CryptoJS.lib.WordArray.create([0xd834dd1e], 4)))
    })
    it('encUtf16Test_testStringify5', 0, ()=> {
      expect('􏿽')
        .assertEqual(CryptoJS.enc.Utf16.stringify(CryptoJS.lib.WordArray.create([0xdbffdffd], 4)))
    })
    it('encUtf16Test_testStringifyLE', 0, ()=> {
      expect('􏿽')
        .assertEqual(CryptoJS.enc.Utf16LE.stringify(CryptoJS.lib.WordArray.create([0xffdbfddf], 4)))
    })


    it('encUtf16Test_testParse1', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x007a0000], 2).toString())
        .assertEqual(CryptoJS.enc.Utf16.parse('z').toString())
    })
    it('encUtf16Test_testParse2', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x6c340000], 2).toString())
        .assertEqual(CryptoJS.enc.Utf16.parse('水').toString())
    })
    it('encUtf16Test_testParse3', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0xd800dc00], 4).toString())
        .assertEqual(CryptoJS.enc.Utf16.parse('𐀀').toString())
    })
    it('encUtf16Test_testParse4', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0xd834dd1e], 4).toString())
        .assertEqual(CryptoJS.enc.Utf16.parse('𝄞').toString())
    })
    it('encUtf16Test_testParse5', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0xdbffdffd], 4).toString())
        .assertEqual(CryptoJS.enc.Utf16.parse('􏿽').toString())
    })
    it('encUtf16Test_testParseLE', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0xffdbfddf], 4).toString())
        .assertEqual(CryptoJS.enc.Utf16LE.parse('􏿽').toString())
    })
  })
}