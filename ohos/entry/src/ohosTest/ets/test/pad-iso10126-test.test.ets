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
import { Data, Key } from './interface/interface'
import { randomFun,createRandomFun } from './interface/Utils'

export default function padIso10126Test() {
  describe('padIso10126Test', ()=> {
    let data:Data | null = null
    let setUpErr:Error | null = null;
    beforeAll( ()=> {
      try {
        // data = {};

        // Replace random method with one that returns a predictable value
        createRandomFun(CryptoJS.lib.WordArray)
        // Save original random method
        if (data) {
          data.random = CryptoJS.lib.WordArray.random;
        }
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach( ()=> {
    })
    it('padIso10126Test_tearDown', 0, ()=> {
      let localErr:Error | null = null;
      try {
        if (data) {
          randomFun(CryptoJS.lib.WordArray,data.random);
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })
    it('padIso10126Test_testPad', 0, ()=> {
      let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddd00], 3);
      CryptoJS.pad.Iso10126.pad(data, 2);
      expect(CryptoJS.lib.WordArray.create([0xdddddd11, 0x22334405]).toString()).assertEqual(data.toString())
    })
    it('padIso10126Test_testPadClamp', 0, ()=> {
      let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
      CryptoJS.pad.Iso10126.pad(data, 2);

      expect(CryptoJS.lib.WordArray.create([0xdddddd11, 0x22334405]).toString()).assertEqual(data.toString())
    })
    it('padIso10126Test_testUnpad', 0, ()=> {
      let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddd11, 0x22334405]);
      CryptoJS.pad.Iso10126.unpad(data);

      expect(CryptoJS.lib.WordArray.create([0xdddddd00], 3).toString()).assertEqual(data.toString())
    })

  })
}