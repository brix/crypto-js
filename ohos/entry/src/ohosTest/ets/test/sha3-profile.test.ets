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

export default function sha3ProfileTest() {
  describe('sha3ProfileTest', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })

    it('sha3ProfileTest_profileSinglePartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:string | null = null;
      try {
        let singlePartMessage = '';
        for (let i = 0; i < 500; i++) {
          singlePartMessage += '12345678901234567890123456789012345678901234567890';
        }
        result = CryptoJS.algo.SHA3.create().finalize(singlePartMessage) + '';
        expect(result).not().assertNull()
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

    it('sha3ProfileTest_profileMultiPartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:string | null = null;
      try {
        for (let i = 0; i < 500; i++) {
          CryptoJS.algo.SHA3.create().update('12345678901234567890123456789012345678901234567890');
        }
        result = CryptoJS.algo.SHA3.create().finalize() + '';
        expect(result).not().assertNull()
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

  })
}