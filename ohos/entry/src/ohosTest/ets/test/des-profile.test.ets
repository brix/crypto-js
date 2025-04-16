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
import { Data, Iv, Key } from './interface/interface';

interface IVData{
  iv:object
}

let IVFn = (iv:object):IVData => {
  let IVFnData:IVData = {
    iv: iv,
  }
  return IVFnData
}

interface KeyIVData{
  iv:object
  key:object

}

let KeyIVFn = (key:object,iv:object):KeyIVData => {
  let KeyIVFnData:KeyIVData = {
    iv: iv,
    key:key
  }
  return KeyIVFnData
}

export default function desProfileTest() {
  let data:KeyIVData | null = null
  let setUpErr:Error | null = null;
  describe('desProfileTest', ()=> {
    beforeAll(()=> {
      try {
        let key:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0001020304050607')
        let iv:CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('08090a0b0c0d0e0f')
        data = KeyIVFn(key,iv);
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('desProfileTest_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.key).not().assertNull()
        expect(data.iv).not().assertNull()
      }
    })
    it('desProfileTest_profileSinglePartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:string | null = null;
      try {
        let singlePartMessage = '';
        for (let i = 0; i < 100; i++) {
          singlePartMessage += '12345678901234567890123456789012345678901234567890';
        }
        if (data) {
          result = CryptoJS.algo.DES.createEncryptor(data.key, IVFn(data.iv)).finalize(singlePartMessage) + '';
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
      expect(result).not().assertNull()
    })

    it('desProfileTest_profileMultiPartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:String | null = null;
      try {
        if (data) {
          for (let i = 0; i < 100; i++) {
            CryptoJS.algo.DES.createEncryptor(data.key, IVFn(data.iv)).process('12345678901234567890123456789012345678901234567890') + '';
          }
          result =  CryptoJS.algo.DES.createEncryptor(data.key, IVFn(data.iv)).finalize() + '';
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
      expect(result).not().assertNull()
    })

  })
}