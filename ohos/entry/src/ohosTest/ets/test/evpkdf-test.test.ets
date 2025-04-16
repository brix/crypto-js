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

export default function evpkdfTest() {
  describe('evpkdfTest', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })

    it('evpkdfTest_testVector', 0, ()=> {
      expect('fdbdf3419fff98bdb0241390f62a9db35f4aba29d77566377997314ebfc709f20b5ca7b1081f94b1ac12e3c8ba87d05a')
        .assertEqual(CryptoJS.EvpKDF('password', 'saltsalt', {
          'keySize': (256 + 128) / 32
        }).toString())
    })
    it('evpkdfTest_testInputIntegrity', 0, ()=> {
      let localErr:Error | null = null;
      try {
        let password:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);
        let salt:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

        let expectedPassword:string = password.toString();
        let expectedSalt:string = salt.toString();

        CryptoJS.EvpKDF(password, salt);
        expect(expectedPassword).assertEqual(password.toString())
        expect(expectedSalt).assertEqual(salt.toString())
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()

    })

    it('evpkdfTest_testHelper', 0, ()=> {
      let localErr:Error | null = null;
      try {

        expect(CryptoJS.algo.EvpKDF.create({
          'keySize': ((256 + 128) / 32)
        })
          .compute('password', 'saltsalt')
          .toString()).assertEqual(CryptoJS.EvpKDF('password', 'saltsalt', {
          'keySize': (256 + 128) / 32
        }).toString())
      } catch (err) {
        localErr = err
      }
      expect(localErr).assertNull()
    })

  })
}