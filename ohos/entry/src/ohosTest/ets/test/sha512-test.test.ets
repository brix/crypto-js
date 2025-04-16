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
import { Utils } from './interface/Utils'

export default function sha512Test() {
  describe('sha512Test', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('sha512Test_testVector1', 0, ()=>{
      expect('cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e')
        .assertEqual(CryptoJS.SHA512('').toString())
    })
    it('sha512Test_testVector2', 0, ()=> {
      expect('07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6')
        .assertEqual(CryptoJS.SHA512('The quick brown fox jumps over the lazy dog').toString())
    })
    it('sha512Test_testVector3', 0, ()=> {
      expect('91ea1245f20d46ae9a037a989f54f1f790f0a47607eeb8a14d12890cea77a1bbc6c7ed9cf205e67b7f2b8fd4c7dfd3a7a8617e45f3c463d481c7e586c39ac1ed')
        .assertEqual(CryptoJS.SHA512('The quick brown fox jumps over the lazy dog.').toString())
    })

    it('sha512Test_testUpdateAndLongMessage', 0, ()=>{
      let SHA512:CryptoJS.Hasher = Utils.getSHA512()

      for (let i = 0; i < 100; i++) {
        SHA512.update('12345678901234567890123456789012345678901234567890');
      }
      expect('9bc64f37c54606dff234b6607e06683c7ba248558d0ec74a11525d9f59e0be566489cc9413c00ca5e9db705fc52ba71214bcf118f65072fe284af8f8cf9500af')
        .assertEqual(SHA512.finalize().toString())
    })
    it('sha512Test_testClone', 0,()=> {
      let SHA512:CryptoJS.Hasher = Utils.getSHA512()

      expect(CryptoJS.SHA512('a').toString()).assertEqual(SHA512.update('a').clone().finalize().toString())
      expect(CryptoJS.SHA512('ab').toString()).assertEqual(SHA512.update('b').clone().finalize().toString())
      expect(CryptoJS.SHA512('abc').toString()).assertEqual(SHA512.update('c').clone().finalize().toString())
    })
    it('sha512Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expected:string = message.toString();

      CryptoJS.SHA512(message);

      expect(expected).assertEqual(message.toString())
    })
    it('sha512Test_testHelper', 0, ()=> {
      expect(CryptoJS.algo.SHA512.create()
        .finalize('')
        .toString()).assertEqual(CryptoJS.SHA512('').toString())
    })
    it('sha512Test_testHmacHelper', 0,()=> {
      expect(CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'))
        .finalize('Hi There')
        .toString())
        .assertEqual(CryptoJS.HmacSHA512('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
  })
}