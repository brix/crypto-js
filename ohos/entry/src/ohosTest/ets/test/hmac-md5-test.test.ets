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

export default function hmacMd5Test() {
  var C = CryptoJS;
  describe('hmacMd5Test', function () {
    beforeAll(function () {

    })
    beforeEach(function () {
    })
    it('hmacMd5Test_testVector1', 0, function () {
      expect('9294727a3638bb1c13f48ef8158bfc9d')
        .assertEqual(C.HmacMD5('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
    })
    it('hmacMd5Test_testVector2', 0, function () {
      expect('750c783e6ab0b503eaa86e310a5db738')
        .assertEqual(C.HmacMD5('what do ya want for nothing?', 'Jefe').toString())
    })

    it('hmacMd5Test_testVector3', 0, function () {
      expect('56be34521d144c88dbb8c733f0e8b3f6')
        .assertEqual(C.HmacMD5(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
          .toString())
    })
    it('hmacMd5Test_testVector4', 0, function () {
      expect('7ee2a3cc979ab19865704644ce13355c')
        .assertEqual(C.HmacMD5('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString())
    })
    it('hmacMd5Test_testVector5', 0, function () {
      expect('0e1bd89c43e3e6e3b3f8cf1d5ba4f77a')
        .assertEqual(C.HmacMD5('abcdefghijklmnopqrstuvwxyz', 'A').toString())
    })
    it('hmacMd5Test_testUpdate', 0, function () {
      var hmac = C.algo.HMAC.create(C.algo.MD5, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
      hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
      hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
      hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));

      expect(C.HmacMD5(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
        .toString())
        .assertEqual(hmac.finalize().toString())
    })
    it('hmacMd5Test_testInputIntegrity', 0, function () {
      var message = C.lib.WordArray.create([0x12345678]);
      var key = C.lib.WordArray.create([0x12345678]);

      var expectedMessage = message.toString();
      var expectedKey = key.toString();

      C.HmacMD5(message, key);

      expect(expectedMessage).assertEqual(message.toString())
      expect(expectedKey).assertEqual(key.toString())
    })
    it('hmacMd5Test_testRespectKeySigBytes', 0, function () {
      var key = C.lib.WordArray.random(8);
      key.sigBytes = 4;

      var keyClamped = key.clone();
      keyClamped.clamp();

      expect(CryptoJS.HmacSHA256("Message", keyClamped).toString())
        .assertEqual(CryptoJS.HmacSHA256("Message", key).toString())
    })

  })
}