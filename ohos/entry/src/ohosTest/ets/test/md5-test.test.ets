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

export default function md5Test() {
  describe('md5Test', ()=> {
    beforeAll(()=> {

    })
    beforeEach(()=> {
    })
    it('md5Test_testVector1', 0, ()=> {
      expect('d41d8cd98f00b204e9800998ecf8427e').assertEqual(CryptoJS.MD5('').toString())
    })
    it('md5Test_testVector2', 0, ()=> {
      expect('0cc175b9c0f1b6a831c399e269772661').assertEqual(CryptoJS.MD5('a').toString())
    })
    it('md5Test_testVector3', 0, ()=> {
      expect('900150983cd24fb0d6963f7d28e17f72').assertEqual(CryptoJS.MD5('abc').toString())
    })
    it('md5Test_testVector4', 0, ()=> {
      expect('f96b697d7cb7938d525a2f31aaf161d0').assertEqual(CryptoJS.MD5('message digest').toString())
    })
    it('md5Test_testVector5', 0, ()=> {
      expect('c3fcd3d76192e4007dfb496cca67e13b').assertEqual(CryptoJS.MD5('abcdefghijklmnopqrstuvwxyz').toString())
    })
    it('md5Test_testVector6', 0, ()=> {
      expect('d174ab98d277d9f5a5611c2c9f419d9f')
        .assertEqual(CryptoJS.MD5('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').toString())
    })
    it('md5Test_testVector7', 0, ()=> {
      expect('57edf4a22be3c955ac49da2e2107b67a')
        .assertEqual(CryptoJS.MD5('12345678901234567890123456789012345678901234567890123456789012345678901234567890')
          .toString())
    })
    it('md5Test_testUpdateAndLongMessage', 0, ()=> {
      let md5:CryptoJS.Hasher = Utils.getMD5Create()

      for (let i = 0; i < 100; i++) {
        md5.update('12345678901234567890123456789012345678901234567890');
      }
      expect('7d017545e0268a6a12f2b507871d0429').assertEqual(md5.finalize().toString())
    })
    it('md5Test_testClone', 0, ()=> {
      let md5:CryptoJS.Hasher  = Utils.getMD5Create()

      expect(CryptoJS.MD5('a').toString()).assertEqual(md5.update('a').clone().finalize().toString())
      expect(CryptoJS.MD5('ab').toString()).assertEqual(md5.update('b').clone().finalize().toString())
      expect(CryptoJS.MD5('abc').toString()).assertEqual(md5.update('c').clone().finalize().toString())
    })
    it('md5Test_testInputIntegrity', 0, ()=> {
      let message:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

      let expected:string = message.toString();

      CryptoJS.MD5(message);

      expect(expected).assertEqual(message.toString())
    })
    it('md5Test_testHelper', 0, ()=> {
      expect(CryptoJS.algo.MD5.create()
        .finalize('')
        .toString()).assertEqual(CryptoJS.MD5('').toString())
    })
    it('md5Test_testHmacHelper', 0, ()=> {
      expect(CryptoJS.algo.HMAC.create(CryptoJS.algo.MD5, CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'))
        .finalize('Hi There')
        .toString()).assertEqual(CryptoJS.HmacMD5('Hi There', CryptoJS.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })


  })
}