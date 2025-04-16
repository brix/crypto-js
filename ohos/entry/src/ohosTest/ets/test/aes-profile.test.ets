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
import { Data } from './interface/interface';

interface KeyIVData{
  key:object
  iv:object
}

let KeyIV = (key:object, iv:object):KeyIVData => {
  let KeyIVData:KeyIVData = {
    key: key,
    iv: iv,
  }
  return KeyIVData
}

interface IVData{
  iv:object
}

let IV = (iv:object):IVData => {
  let IVData:IVData = {
    iv: iv,
  }
  return IVData
}

export default function aesProfileTest() {
  let data:KeyIVData | null = null
  let setUpErr:Error | null = null;
  describe('aesProfileTest', ()=> {
    beforeAll(()=> {
      try {
        data = KeyIV(CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'),CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'))
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(()=> {
    })
    it('aes_setUp', 0, ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.key).not().assertNull()
        expect(data.iv).not().assertNull()
      }
    })

    it('aes_profileSinglePartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:string | null = null;
      try {
        let singlePartMessage = '';
        for (let i = 0; i < 500; i++) {
          singlePartMessage += '12345678901234567890123456789012345678901234567890';
        }
        if (data) {
          result = CryptoJS.algo.AES.createEncryptor(data.key, IV(data.iv)).finalize(singlePartMessage) + '';
          expect(result).not().assertNull()
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

    it('aes_profileMultiPartMessage', 0, ()=> {
      let localErr:Error | null = null;
      let result:string | null = null;
      try {
        if (data) {
          for (let i = 0; i < 500; i++) {
            CryptoJS.algo.AES.createEncryptor(data.key, IV(data.iv)).process('12345678901234567890123456789012345678901234567890') + '';
          }
          result = CryptoJS.algo.AES.createEncryptor(data.key, IV(data.iv)).finalize() + '';
          expect(result).not().assertNull()
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

  })
}