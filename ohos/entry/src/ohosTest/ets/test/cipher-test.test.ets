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
import { ExtendWithCMAC } from './extendWithCMAC'

export default function cipherTest() {

  describe('cipherTest', () => {
    beforeAll(() => {

    })
    beforeEach(() => {
    })

    it('cipherTest_cipher_core_test', 0, () => {
      let localErr: Error | null = null;
      try {
        // Extend with CMAC to test `cipher-core.js` L:457-462
        let CryptoJSCMAC: ExtendWithCMAC = new ExtendWithCMAC();
        expect('35e1872b95ce5d99bb5dbbbbd79b9b9b')
          .assertEqual(CryptoJSCMAC.CMAC)
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()

    })
  })
}