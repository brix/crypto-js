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
import { KeyData, KeyFn} from './interface/interface'

export default function rc4ProfileTest() {
  let data:KeyData | null = null
  let setUpErr:Error | null = null;
  describe('rc4ProfileTest',()=> {
    beforeAll(()=> {
      try {
        let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f')
        data = KeyFn(key);

      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('rc4ProfileTest_setUp', 0, ()=> {
      if(data){
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.key).not().assertNull()
      }
    })
    it('rc4ProfileTest_profileSinglePartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:string | null = null;
      try {
        let singlePartMessage = '';
        for (let i = 0; i < 500; i++) {
          singlePartMessage += '12345678901234567890123456789012345678901234567890';
        }

        if (data) {
          result = CryptoJS.algo.RC4.createEncryptor(data.key).finalize(singlePartMessage) + '';

        }
        expect(result).not().assertNull()
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()

    })

    it('rc4ProfileTest_profileMultiPartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:string | null = null;
      try {
        if (data) {
          for (let i = 0; i < 500; i++) {
            CryptoJS.algo.RC4.createEncryptor(data.key).process('12345678901234567890123456789012345678901234567890') + '';
          }
          result = CryptoJS.algo.RC4.createEncryptor(data.key).finalize() + '';
          expect(result).not().assertNull()
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

  })
}