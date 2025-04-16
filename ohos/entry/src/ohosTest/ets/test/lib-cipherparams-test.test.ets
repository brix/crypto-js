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
import { MultiplyHasSaltData} from './interface/MultiplyData';

export default function libCipherparamsTest() {
  let data:MultiplyHasSaltData | null = null
  let setUpErr:Error | null = null;
  describe('libCipherparamsTest',  ()=> {
    beforeAll( ()=> {
      try {
        if (data) {
          // data = {};

          data.ciphertext = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
          data.key = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
          data.iv = CryptoJS.enc.Hex.parse('202122232425262728292a2b2c2d2e2f');
          data.salt = CryptoJS.enc.Hex.parse('0123456789abcdef');
          data.algorithm = CryptoJS.algo.AES;
          data.mode = CryptoJS.mode.CBC;
          data.padding = CryptoJS.pad.Pkcs7;
          data.blockSize = data.algorithm.blockSize;
          data.formatter = CryptoJS.format.OpenSSL;

          data.cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: data.ciphertext,
            key: data.key,
            iv: data.iv,
            salt: data.salt,
            algorithm: data.algorithm,
            mode: data.mode,
            padding: data.padding,
            blockSize: data.blockSize,
            formatter: data.formatter
          });
        }
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach( ()=> {
    })

    it('libCipherparamsTest_setUp', 0,  ()=> {
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.key).not().assertNull()
        expect(data.iv).not().assertNull()
        expect(data.salt).not().assertNull()
        expect(data.algorithm).not().assertNull()
        expect(data.mode).not().assertNull()
        expect(data.padding).not().assertNull()
        expect(data.blockSize).not().assertNull()
        expect(data.formatter).not().assertNull()
      }
    })
    it('libCipherparamsTest_testInit', 0,  ()=> {
      if (data) {
        expect(data.ciphertext).assertEqual(data.cipherParams.ciphertext)
        expect(data.key).assertEqual(data.cipherParams.key)
        expect(data.iv).assertEqual(data.cipherParams.iv)
        expect(data.salt).assertEqual(data.cipherParams.salt)
        expect(data.algorithm).assertEqual(data.cipherParams.algorithm)
        expect(data.mode).assertEqual(data.cipherParams.mode)
        expect(data.padding).assertEqual(data.cipherParams.padding)
        expect(data.blockSize).assertEqual(data.cipherParams.blockSize)
        expect(data.formatter).assertEqual(data.cipherParams.formatter)
      }
    })

    it('libCipherparamsTest_testToString0', 0,  ()=> {
      if (data) {
        expect(CryptoJS.format.OpenSSL.stringify(data.cipherParams)).assertEqual(data.cipherParams.toString())

      }
    })
    it('libCipherparamsTest_testToString1', 0,  ()=> {
      let JsonFormatter:CryptoJS.Format = {
        stringify: (cipherParams:CryptoJS.lib.CipherParams):string=> {
          return '{ ct: ' + cipherParams.ciphertext + ', iv: ' + cipherParams.iv + ' }';
        },
        parse: (cipherParams:string):CryptoJS.lib.CipherParams => {return CryptoJS.lib.CipherParams.create({})}
      };
      if (data && JsonFormatter.stringify !== undefined) {
        expect(JsonFormatter.stringify(data.cipherParams)).assertEqual(data.cipherParams.toString(JsonFormatter))

      }
    })

  })
}

