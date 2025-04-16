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
import {KeyIVSaltData } from './interface/interface'

export default function kdfOpensslTest() {
  describe('kdfOpensslTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('kdfOpensslTest_testVector', 0, ()=> {
      let derivedParams:CryptoJS.lib.CipherParams = CryptoJS.kdf.OpenSSL.execute('password', 256 / 32, 128 / 32, CryptoJS.enc.Hex.parse('0a9d8620cf7219f1'));

      expect('50f32e0ec9408e02ff42364a52aac95c3694fc027256c6f488bf84b8e60effcd')
        .assertEqual(derivedParams.key.toString())
      expect('81381e39b94fd692dff7e2239a298cb6').assertEqual(derivedParams.iv.toString())
      expect('0a9d8620cf7219f1').assertEqual(derivedParams.salt.toString())
    })


  })
}