/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { CryptoJS } from '@ohos/crypto-js'

export interface ModePaddingData{
  mode:object
  padding:object
}

export let ModePaddingFn = (mode:object ,padding:object):ModePaddingData => {
  let ModePaddingFnData:ModePaddingData = {
    mode: mode,
    padding: padding,
  }
  return ModePaddingFnData
}

export interface IVModePaddingData{
  iv:object
  mode:object
  padding:object
}

export let IVModePaddingFn = (iv:CryptoJS.lib.WordArray,mode:object ,padding:object):CryptoJS.CipherOption => {
  let IVModePaddingFnData:CryptoJS.CipherOption = {
    iv:iv,
    mode: mode,
    padding: padding,
  }
  return IVModePaddingFnData
}
