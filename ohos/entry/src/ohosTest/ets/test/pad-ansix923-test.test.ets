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
import { Data } from './interface/interface'
import { Utils } from './interface/Utils'

export default function padAnsix923Test() {
  describe('padAnsix923Test', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })
    it('padAnsix923Test_testPad', 0, ()=> {
      let data:CryptoJS.lib.WordArray = Utils.getLibWordArray()

      CryptoJS.pad.AnsiX923.pad(data, 2);
      expect(CryptoJS.lib.WordArray.create([0xdddddd00, 0x00000005]).toString()).assertEqual(data.toString())
    })
    it('padAnsix923Test_testPadClamp', 0, ()=> {
      let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
      CryptoJS.pad.AnsiX923.pad(data, 2);

      expect(CryptoJS.lib.WordArray.create([0xdddddd00, 0x00000005]).toString()).assertEqual(data.toString())
    })
    it('padAnsix923Test_testUnpad', 0, ()=> {
      let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddd00, 0x00000005]);
      CryptoJS.pad.AnsiX923.unpad(data);

      expect(CryptoJS.lib.WordArray.create([0xdddddd00], 3).toString()).assertEqual(data.toString())
    })

  })
}