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
import { Utils,getDataCryptoJS,Data } from './interface/Utils';
import { hasOwn } from '@ohos/crypto-js/src/main/js/utils';

export default function libBaseTest() {
  let data:Data | null = null

  let setUpErr:Error | null = null;
  describe('libBase', () =>{
    beforeAll(() =>{
      try {
        getDataCryptoJS(data,CryptoJS.lib.Base)
      } catch (err) {
        setUpErr = err
      }
    })
    beforeEach(() =>{
    })

    it('libBaseTest_setUp', 0, () =>{
      if (data) {
        expect(setUpErr).assertNull()
        expect(data).not().assertNull()
        expect(data.obj).not().assertNull()

      }
    })
    it('libBaseTest_testExtendInheritance', 0, () =>{
      if (data) {
        expect(CryptoJS.lib.Base.extend).assertEqual(Utils.getObjExtend(data))
        expect(!hasOwn(data.obj,'extend')).assertFalse()
      }
    })

    it('libBaseTest_testExtendSuper', 0, () =>{
      if (data) {
        expect(CryptoJS.lib.Base).assertEqual(Utils.getObjSuper(data))
      }
    })
    it('libBaseTest_testExtendOverrideInit', 0, () =>{
      if (data) {
        expect(Utils.getOverridesInit(data)).assertEqual(Utils.getObjInit(data))
        expect(!hasOwn(data.obj2,'init')).assertTrue()

      }
    })
    it('libBaseTest_testExtendOverrideToString', 0, () =>{
      if (data) {
        expect(Utils.getOverridesToString(data)).assertEqual(Utils.getObjToString(data))
        expect(!hasOwn(data.obj2,'toString')).assertTrue()

      }
    })
    it('libBaseTest_testCreateInheritanceFromBase', 0, () =>{
      if (data) {
        expect(CryptoJS.lib.Base.extend).assertEqual(Utils.getObjExtend(data))
        expect(!hasOwn(data.obj,'extend')).assertFalse()

      }
    })
    it('libBaseTest_testCreateSuper', 0, () =>{
      if (data) {
        expect(Utils.getObj(data)).assertEqual(Utils.getObjSuper2(data))
      }
    })
    it('libBaseTest_testCreateInit', 0, () =>{
      if (data) {
        expect(Utils.getObjInitFired2(data)).assertTrue()
        expect('argValue').assertEqual(Utils.getObjInitArg2(data))
      }
    })
    it('libBaseTest_testMixIn', 0, () =>{
      if (data) {
        expect(!hasOwn(data.obj,'mixinMethod')).assertTrue()

        expect(Utils.getMixinsMixinMethod(data)).assertEqual(Utils.getMixinMethod(data))
      }
    })
    it('libBaseTest_testCloneDistinct', 0, () =>{
      if (data) {
        expect(Utils.getObj(data)).not().assertEqual(Utils.getObjClone(data))
      }
    })
    it('libBaseTest_testCloneCopy', 0, () =>{
      if (data) {
        expect(Utils.getObjInitArg(data)).assertEqual(Utils.getInitArg(data))
      }
    })
    it('libBaseTest_testCloneIndependent1', 0, () =>{
      if (data!=null) {
        Utils.getObj2(data).initArg = 'newValue';
        expect(Utils.getObjInitArg2(data)).not().assertEqual(Utils.getInitArg(data))
      }
    })
    it('libBaseTest_testCloneIndependent2', 0, () =>{
      if (data) {
        expect(Utils.getObj(data)).assertEqual(Utils.getData(data))
        expect(Utils.getObjClone(data)).assertEqual(Utils.getObjCloneData(data))
        expect(Utils.getData(data)).not().assertEqual(Utils.getObjCloneData(data))
      }
    })

  })
}