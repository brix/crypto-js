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

interface TestDatas{
  name:string
  str:string
  digest_hex:string
}

let testFn = (name:string, str:string ,digest_hex:string):TestDatas => {
  let testFnData:TestDatas = {
    name: name,
    str: str,
    digest_hex: digest_hex
  }
  return testFnData
}

export default function CryptoJS_MD5() {
  // digest_hex 值来自原库的函数调用，同调用nodejs内置模块crypto.createHash('md5').update(data.str).digest('hex')的结果一样
  const testDatas = [
    testFn('en','en test','e5cc3c09e799a16d252701c18a3f8bdf'),
    testFn('en_punctuation',"英文符号 en_punctuation<>\\/;:'\"][{}=-0987654321`~!@#$%^&*()_+||",'c383d2f39536e886778d271172629697'),
    testFn('cn','中文测试','089b4943ea034acfa445d050c7913e55'),
    testFn('cn_punctuation',`中文符号 cn_punctuation，。、；‘【】、=-0987654321·~！@#￥%……&*（）——+{}|：“《》？`,'0e23be865f4028097595475767001c8b'),
  ];

  describe('CryptoJS_MD5', ()=> {
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
      let md5Name = `MD5_${data.name}`.replace('-', '_')
      it(md5Name, 0, ()=> {
        let digest_hex:string = CryptoJS.enc.Hex.stringify(CryptoJS.MD5(data.str));
        expect(data.digest_hex).assertEqual(digest_hex);
      })
    })
  })
}