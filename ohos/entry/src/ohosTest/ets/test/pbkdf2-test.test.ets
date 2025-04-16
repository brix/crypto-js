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
import { KeyIterationsFn, KeySizeF, KeySizeFn } from './interface/MultiplyData'
import taskpool from '@ohos.taskpool';

@Concurrent
async function taskPBKDF2(salt: object): Promise<string> {
  return CryptoJS.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', salt).toString()
}

@Concurrent
async function taskPBKDF2COMpianist(): Promise<string> {
  return CryptoJS.PBKDF2(CryptoJS.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', KeyIterationsFn(128 / 32, 50))
    .toString()
}

@Concurrent
async function taskPBKDF2PasswordSalt(password: CryptoJS.lib.WordArray|string, salt: CryptoJS.lib.WordArray|string): Promise<void> {
  CryptoJS.PBKDF2(password, salt)
}

@Concurrent
async function taskPBKDF2Create(): Promise<string> {
  return CryptoJS.algo.PBKDF2.create(KeyIterationsFn(128 / 32,10000))
    .compute('password', 'ATHENA.MIT.EDUraeburn')
    .toString()
}


export default function pbkdf2Test() {
  describe('pbkdf2Test', () => {
    beforeAll(() => {

    })
    beforeEach(() => {
    })

    it('pbkdf2Test_testKeySize128', 0, async (done:Function) => {
      try {
        let  data:ESObject=await taskpool.execute(taskPBKDF2, KeyIterationsFn(128 / 32,10000))
        expect('4cd30cf34c664059b3640bad0817a0e9')
          .assertEqual(data)

      } finally {
        done()
      }
  })

    it('pbkdf2Test_testKeySize256', 0,async (done:Function) => {
      try {
        let data:ESObject=await taskpool.execute(taskPBKDF2, KeyIterationsFn(256 / 32,10000))
        expect('4cd30cf34c664059b3640bad0817a0e900bbc933c2bd5a3e815cc358fc6b82b1')
          .assertEqual(data)
      } finally {
        done()
      }


    })

    it('pbkdf2Test_testKeySize128Iterations2', 0, async(done:Function) => {
      try {
        let data:ESObject=await taskpool.execute(taskPBKDF2, KeyIterationsFn(128 / 32, 2))
        expect('262fb72ea65b44ab5ceba7f8c8bfa781')
          .assertEqual(data)
      } finally {
        done()
      }

    })

    it('pbkdf2Test_testKeySize256Iterations2', 0, async(done:Function) => {
      try {
        let data:ESObject=await taskpool.execute(taskPBKDF2, KeyIterationsFn(256 / 32, 2))
        expect('262fb72ea65b44ab5ceba7f8c8bfa7815ff9939204eb7357a59a75877d745777')
          .assertEqual(data)
      } finally {
        done()
      }

    })

    it('pbkdf2Test_testKeySize128Iterations1200', 0, () => {
      let keySize: ESObject = Utils.getPasswordIsEqualKeySize128321200()
      expect('c76a982415f1acc71dc197273c5b6ada').assertEqual(keySize.toString())
    })

    it('pbkdf2Test_testKeySize256Iterations1200', 0, async (done: Function) => {
      try {
        let data: ESObject = await taskpool.execute(taskPBKDF2, KeyIterationsFn(256 / 32, 1200))
        expect('c76a982415f1acc71dc197273c5b6ada32f62915ed461718aad32843762433fa')
          .assertEqual(data)
      } finally {
        done()
      }

    })

    it('pbkdf2Test_testKeySize128Iterations5', 0, () => {
      expect('74e98b2e9eeddaab3113c1efc6d82b07').assertEqual(Utils.getCryptoJSIsEqual(128))
    })

    it('pbkdf2Test_testKeySize256Iterations5', 0, () => {
      expect('74e98b2e9eeddaab3113c1efc6d82b073c4860195b3e0737fa21a4778f376321')
        .assertEqual(Utils.getCryptoJSIsEqual(256))
    })

    it('pbkdf2Test_testKeySize128Iterations1200PassPhraseEqualsBlockSize', 0, () => {
      let KeySize: ESObject = Utils.getKeySize128321200IsEqual()

      expect('c1dfb29a4d2f2fb67c6f78d074d66367')
        .assertEqual(KeySize.toString())
    })
    it('pbkdf2Test_testKeySize256Iterations1200PassPhraseEqualsBlockSize', 0, () => {
      let keySize: ESObject = Utils.getPBKDF2IsEqualkeySize128321200equals()

      expect('c1dfb29a4d2f2fb67c6f78d074d663671e6fd4da1e598572b1fecf256cb7cf61')
        .assertEqual(keySize.toString())
    })
    it('pbkdf2Test_testKeySize128Iterations1200PassPhraseExceedsBlockSize', 0, () => {
      let keySize: ESObject = Utils.getPBKDF2IsEqualkeySize128321200(128)

      expect('22344bc4b6e32675a8090f3ea80be01d')
        .assertEqual(keySize.toString())
    })
    it('pbkdf2Test_testKeySize256Iterations1200PassPhraseExceedsBlockSize', 0, () => {
      let keySize: ESObject = Utils.getPBKDF2IsEqualkeySize128321200(256)

      expect('22344bc4b6e32675a8090f3ea80be01d5f95126a2cddc3facc4a5e6dca04ec58')
        .assertEqual(keySize.toString())
    })

    it('pbkdf2Test_testKeySize128Iterations50', 0, async (done: ESObject) => {
      try {
        let data: ESObject = await taskpool.execute(taskPBKDF2COMpianist);
        expect('44b0781253db3141ac4174af29325818')
          .assertEqual(data)
      } finally {
        done()
      }

    })
    it('pbkdf2Test_testKeySize256Iterations50', 0, () => {
      let iterations50: ESObject = Utils.getPBKDF2Iterations50()

      expect('44b0781253db3141ac4174af29325818584698d507a79f9879033dec308a2b77')
        .assertEqual(iterations50.toString())
    })
    it('pbkdf2Test_testInputIntegrity', 0, async (done: Function) => {
      try {
        let password: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);
        let salt: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x12345678]);

        let expectedPassword: string = password.toString();
        let expectedSalt: string = salt.toString();
        await taskpool.execute(taskPBKDF2PasswordSalt, password, salt)

        // CryptoJS.PBKDF2(password, salt);

        expect(expectedPassword).assertEqual(password.toString())
        expect(expectedSalt).assertEqual(salt.toString())
      } finally {
        done()
      }

    })

    it('pbkdf2Test_testHelper', 0, async (done: Function) => {
      try {
        let taskPBKDF2C: ESObject = await taskpool.execute(taskPBKDF2Create);

        let data: ESObject = await taskpool.execute(taskPBKDF2, KeyIterationsFn(128 / 32,10000))

        expect(taskPBKDF2C).assertEqual(data)
      } finally {
        done()
      }
    })

  })
}