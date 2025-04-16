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

import { beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import { CryptoJS } from '@ohos/crypto-js'
import { HasherData, SaltHasherData } from './interface/Utils'

let HasherFn = (hasher: object): HasherData => {
  let HasherFnData: HasherData = {
    hasher: hasher,
  }
  return HasherFnData
}

let SaltHasherFn = (saltA: object, hasher: object): SaltHasherData => {
  let SaltHasherFnData: SaltHasherData = {
    saltA: saltA,
    hasher: hasher
  }
  return SaltHasherFnData
}

export default function blowfishTest() {
  let data: ESObject
  describe('blowfishTest', () => {
    beforeAll(() => {
      data = CryptoJS.enc.Hex.parse('AA00000000000000');
    })

    it('blowfishTest_profileMultiPartMessage', 0, () => {
      let encryptedA: string | null = null;
      if (data) {
        encryptedA = CryptoJS.Blowfish.encrypt('Test', 'pass', SaltHasherFn(data.saltA, CryptoJS.algo.SHA256))
          .toString();
        expect(CryptoJS.Blowfish.decrypt(encryptedA, 'pass', HasherFn(CryptoJS.algo.SHA256))
          .toString(CryptoJS.enc.Utf8)).assertEqual('Test')
      }
    })
  })
}