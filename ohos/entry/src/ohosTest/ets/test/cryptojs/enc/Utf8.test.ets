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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { CryptoJS } from '@ohos/crypto-js'
import { testDatasData } from '../../cryptojs_enc_utf8'

// }

export default function CryptoJS_enc_Utf8() {
  // wordArray 值来自原库的函数调用
  const testDatas = testDatasData()

  describe('CryptoJS_enc_Utf8', ()=> {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(()=> {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(()=> {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(()=> {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(()=> {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    testDatas.forEach((data) => {
      let parseName:string = `parse_${data.name}`.replace('-', '_')
      it(parseName, 0, ()=> {
        let wordArr:CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(data.str);
        expect(JSON.stringify(data.wordArray)).assertEqual(JSON.stringify(wordArr));
      })
      let stringName:string = `stringify_${data.name}`.replace('-', '_')
      it(stringName, 0, ()=> {
        let str:string = CryptoJS.enc.Utf8.stringify(data.wordArray);
        expect(data.str).assertEqual(str);
      })
    })
  })
}