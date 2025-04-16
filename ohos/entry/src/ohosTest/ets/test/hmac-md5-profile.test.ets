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
import { KeyData, Key, KeyFn } from './interface/interface';

export default function hmacMd5ProfileTest() {
  let data:KeyData | null = null
  let setUpErr:Error | null = null;
  describe('hmacMd5ProfileTest', ()=> {
    beforeAll(()=> {
      try {
        let key:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random(128 / 8)
        data = KeyFn(key);
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('hmacMd5ProfileTest_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.key).not().assertNull()
      }
    })
    it('hmacMd5ProfileTest_profileSinglePartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:String | null = null;
      try {
        if (data) {
          let singlePartMessage = '';
          for (let i = 0; i < 500; i++) {
            singlePartMessage += '12345678901234567890123456789012345678901234567890';
          }
          result = CryptoJS.algo.HMAC.create(CryptoJS.algo.MD5, data.key).finalize(singlePartMessage) + '';
          expect(result).not().assertNull()
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()

    })

    it('hmacMd5ProfileTest_profileMultiPartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:String | null = null;
      try {
        if (data) {
          for (let i = 0; i < 500; i++) {
            CryptoJS.algo.HMAC.create(CryptoJS.algo.MD5, data.key).update('12345678901234567890123456789012345678901234567890');
          }
          result = CryptoJS.algo.HMAC.create(CryptoJS.algo.MD5, data.key).finalize() + '';
          expect(result).not().assertNull()
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

  })
}