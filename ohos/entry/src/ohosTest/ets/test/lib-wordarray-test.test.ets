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

export default function libWordarrayTest() {
  describe('libWordarrayTest', ()=> {
    beforeAll(()=> {
    })
    beforeEach(()=> {
    })
    it('libWordarrayTest_testInit0', 0, ()=> {
      expect('').assertEqual(CryptoJS.lib.WordArray.create().toString())
    })
    it('libWordarrayTest_testInit1', 0, ()=> {
      expect('12345678').assertEqual(CryptoJS.lib.WordArray.create([0x12345678]).toString())
    })
    it('libWordarrayTest_testInit2', 0, ()=> {
      expect('1234').assertEqual(CryptoJS.lib.WordArray.create([0x12345678], 2).toString())
    })
    it('libWordarrayTest_testToStringPassedEncoder', 0, ()=> {
      expect('\x12\x34\x56\x78').assertEqual(CryptoJS.lib.WordArray.create([0x12345678]).toString(CryptoJS.enc.Latin1))
    })
    it('libWordarrayTest_testToStringDefaultEncoder', 0, ()=> {
      expect('12345678').assertEqual(CryptoJS.lib.WordArray.create([0x12345678]).toString())
    })
    it('libWordarrayTest_testConcat3', 0, ()=> {
      let wordArray1:CryptoJS.lib.WordArray = Utils.getEightWordArray(3)//:typeof CryptoJS = CryptoJS.lib.WordArray.create([0x12345678], 3);
      let wordArray2:CryptoJS.lib.WordArray  = Utils.getEightWordArray(3)

      expect('123456123456').assertEqual(wordArray1.concat(wordArray2).toString())
      expect('123456123456').assertEqual(wordArray1.toString())
    })
    it('libWordarrayTest_testConcat4', 0, ()=> {
      let wordArray1:CryptoJS.lib.WordArray  = Utils.getEightWordArray(4)
      let wordArray2:CryptoJS.lib.WordArray  = Utils.getEightWordArray(3)

      expect('12345678123456').assertEqual(wordArray1.concat(wordArray2).toString())
      expect('12345678123456').assertEqual(wordArray1.toString())
    })
    it('libWordarrayTest_testConcat5', 0, ()=> {
      let wordArray1:CryptoJS.lib.WordArray  = Utils.getEightWordArray(5)
      let wordArray2:CryptoJS.lib.WordArray  = Utils.getEightWordArray(3)

      expect('1234567800123456').assertEqual(wordArray1.concat(wordArray2).toString())
      expect('1234567800123456').assertEqual(wordArray1.toString())
    })
    it('libWordarrayTest_testConcatLong', 0, ()=> {
      let wordArray1:CryptoJS.lib.WordArray  = Utils.getCreateWordArray();

      let wordArray2:CryptoJS.lib.WordArray  = Utils.getCreateWordArray();
      let wordArray3:CryptoJS.lib.WordArray  = Utils.getCreateWordArray();

      for (let i = 0; i < 500000; i++) {
        wordArray2.words[i] = i;
        wordArray3.words[i] = i;
      }
      wordArray2.sigBytes = wordArray3.sigBytes = 500000;

      expect(wordArray2.toString() + wordArray3.toString())
        .assertEqual(wordArray1.concat(wordArray2.concat(wordArray3)).toString())
    })
    it('libWordarrayTest_testClamp', 0, ()=> {
      let wordArray:CryptoJS.lib.WordArray  = Utils.getEightBytesWordArray(3)

      wordArray.clamp();
      expect([0x12345600].toString()).assertEqual(wordArray.words.toString())
    })
    it('libWordarrayTest_testClone', 0, ()=> {
      let wordArray:CryptoJS.lib.WordArray = Utils.getEightBytesArray()
      let clone:CryptoJS.lib.WordArray = wordArray.clone();

      clone.words[0] = 0;
      expect(wordArray.toString()).not().assertEqual(clone.toString())
    })
    it('libWordarrayTest_testRandom', 0, ()=> {
      expect(CryptoJS.lib.WordArray.random(8).toString()).not().assertEqual(CryptoJS.lib.WordArray.random(8).toString())
      expect(8).assertEqual(CryptoJS.lib.WordArray.random(8).sigBytes)
    })


  })
}