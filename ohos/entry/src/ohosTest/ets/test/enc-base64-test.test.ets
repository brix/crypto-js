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

export default function encBase64Test() {

  describe('encBase64Test', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })
    it('encBase64Test_testStringify0', 0, ()=> {
      expect('').assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 0)))
    })
    it('encBase64Test_testStringify1', 0, ()=> {
      expect('Zg==').assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 1)))
    })

    it('encBase64Test_testStringify2', 0, ()=> {
      expect('Zm8=').assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 2)))
    })
    it('encBase64Test_testStringify3', 0, ()=> {
      expect('Zm9v').assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 3)))
    })
    it('encBase64Test_testStringify4', 0, ()=> {
      expect('Zm9vYg==').assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 4)))
    })
    it('encBase64Test_testStringify5', 0, ()=> {
      expect('Zm9vYmE=').assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 5)))
    })
    it('encBase64Test_testStringify6', 0, ()=> {
      expect('Zm9vYmFy').assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 6)))
    })
    it('encBase64Test_testStringify15', 0, ()=> {
      expect('Pj4+Pz8/Pj4+Pz8/PS8r')
        .assertEqual(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create([0x3e3e3e3f, 0x3f3f3e3e, 0x3e3f3f3f, 0x3d2f2b00], 15)))
    })
    it('encBase64Test_testParse0', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 0).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('').toString())
    })
    it('encBase64Test_testParse1', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 1).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('Zg==').toString())
    })
    it('encBase64Test_testParse2', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 2).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('Zm8=').toString())
    })
    it('encBase64Test_testParse3', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 3).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('Zm9v').toString())
    })
    it('encBase64Test_testParse4', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 4).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('Zm9vYg==').toString())
    })
    it('encBase64Test_testParse5', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 5).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('Zm9vYmE=').toString())
    })
    it('encBase64Test_testParse6', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x666f6f62, 0x61720000], 6).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('Zm9vYmFy').toString())
    })
    it('encBase64Test_testParse15', 0, ()=> {
      expect(CryptoJS.lib.WordArray.create([0x3e3e3e3f, 0x3f3f3e3e, 0x3e3f3f3f, 0x3d2f2b00], 15).toString())
        .assertEqual(CryptoJS.enc.Base64.parse('Pj4+Pz8/Pj4+Pz8/PS8r').toString())
    })

  })
}