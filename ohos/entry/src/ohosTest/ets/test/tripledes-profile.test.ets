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

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, Level } from '@ohos/hypium'
import { CryptoJS } from '@ohos/crypto-js'
import { KeyIVData, IVData, KeyIVFn, KeyData } from "./interface/interface"
import { Utils } from './interface/Utils'
import taskpool from '@ohos.taskpool';

@Concurrent
async function taskMessage(data: ESObject): Promise<ESObject> {
  let singlePartMessage: string = '';
  for (let i = 0; i < 100; i++) {
    singlePartMessage += '12345678901234567890123456789012345678901234567890';
  }
  let options: IVData = {
    iv: data.iv
  }
  return CryptoJS.algo.TripleDES.createEncryptor(data.key, options).finalize(singlePartMessage) + '';
}

@Concurrent
async function taskDes(data: ESObject): Promise<ESObject> {
  let des: ESObject = Utils.getCreateEncryptor(data)

  for (let i = 0; i < 100; i++) {
    des.process('12345678901234567890123456789012345678901234567890') + '';

  }
  let options: IVData = {
    iv: data.iv
  }
  return CryptoJS.algo.TripleDES.createEncryptor(data.key, options).finalize() + '';
}

export default function tripledesProfileTest() {
  let data: KeyIVData | null = null
  let setUpErr: Error | null = null;

  describe('tripledesProfileTest', () => {

    beforeAll(() => {

      try {
        let key: CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('0001020304050607')
        let iv: CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('08090a0b0c0d0e0f')
        data = KeyIVFn(key, iv)

      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(() => {
    })
    it('tripledesProfileTest_setUp', 0, () => {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.key).not().assertNull()
        expect(data.iv).not().assertNull()
      }
    })

    it('tripledesProfileTest_profileSinglePartMessage', 0, async (done: Function) => {
      let localErr: Error | null = null;
      let result: ESObject = null;

      try {
        if (data) {
          result = await taskpool.execute(taskMessage, data)
          expect(result).not().assertNull()

        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
      done()
    })

    it('tripledesProfileTest_profileMultiPartMessage', 0, async (done: Function) => {
      let localErr: Error | null = null;
      let result: ESObject = null;
      try {

        if (data) {
          result = taskpool.execute(taskDes, data)
          expect(result).not().assertNull()
        }
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
      done()
    })

  })
}