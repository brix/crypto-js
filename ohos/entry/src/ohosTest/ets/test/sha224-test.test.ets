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

export default function sha224Test() {
  describe('sha224Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('sha224Test_testVector1', 0, ()=>{
      expect('d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f')
        .assertEqual(CryptoJS.SHA224('').toString())
    })
    it('sha224Test_testVector2', 0, ()=> {
      expect('730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525')
        .assertEqual(CryptoJS.SHA224('The quick brown fox jumps over the lazy dog').toString())
    })
    it('sha224Test_testVector3', 0, ()=> {
      expect('619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c')
        .assertEqual(CryptoJS.SHA224('The quick brown fox jumps over the lazy dog.').toString())
    })


  })
}