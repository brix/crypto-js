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

export interface MultiplyData{
  ciphertext: object,
  key: object,
  iv: object,
  algorithm: object,
  blockSize: BlockSize,
  formatter: object,
  mode:object,
  padding:object,
}

export interface BlockSize{
  blockSize: object,
}

export let MultiplyFn = (ciphertext: object,
                            key: object,
                            iv: object,
                            algorithm: object,
                            blockSize: BlockSize,
                            formatter: object,
                            mode:object ,
                            padding:object):MultiplyData => {
  let MultiplyDataFnData:MultiplyData = {
    ciphertext: ciphertext,
    key: key,
    iv: iv,
    algorithm: algorithm,
    blockSize: blockSize,
    formatter: formatter,
    mode: mode,
    padding: padding,
  }
  return MultiplyDataFnData
}


export interface MultiplyHasSaltNoCipherParamsData{
  ciphertext: object,
  key: object,
  iv: object,
  salt: object,
  algorithm: BlockSize,
  blockSize: object,
  formatter: object,
  mode:object,
  padding:object,
  toString: (str?: string | JsonFormatterClass) => string
}

export class JsonFormatterClass {
  stringify: (cipherParams: CryptoJS.lib.CipherParams) => string = (cipherParams: CryptoJS.lib.CipherParams): string => {
    return '{ ct: ' + cipherParams.ciphertext + ', iv: ' + cipherParams.iv + ' }';
  }
}

export interface Ciphertext {
  toString: (str?: string) => string
}

export interface MultiplyHasSaltData{
  ciphertext: CryptoJS.lib.WordArray,
  key: object,
  iv: object,
  salt: CryptoJS.lib.WordArray,
  algorithm: CryptoJS.CipherStatic,
  blockSize?: number,
  formatter: object,
  mode:object,
  padding:object,
  cipherParams:CryptoJS.lib.CipherParams,
}


export interface CiphertextData{
  ciphertext:object
}

export let CiphertextFn = (ciphertext:object):CiphertextData => {
  let CiphertextFnData:CiphertextData = {
    ciphertext: ciphertext,
  }
  return CiphertextFnData
}


export interface CiphertextSaltData{
  ciphertext:object
  salt:object
}

export let CiphertextSaltFn = (ciphertext:object ,salt:object):CiphertextSaltData => {
  let CiphertextSaltFnData:CiphertextSaltData = {
    ciphertext: ciphertext,
    salt: salt,
  }
  return CiphertextSaltFnData
}

export interface KeySize{
  key:number
  size:number
}

export let KeySizeFn = (key:number,
size:number):KeySize => {
  let KeySizeFnData:KeySize = {
    key:key,
    size: size,
  }
  return KeySizeFnData
}

export interface KeyIterations{
  keySize:number
  iterations:number
}

export let KeyIterationsFn = (keySize:number,
                              iterations:number):KeyIterations => {
  let KeyIterationsFnData:KeyIterations = {
    keySize:keySize,
    iterations: iterations,
  }
  return KeyIterationsFnData
}

export interface KeySizeData{
  keySize:number
}

export let KeySizeF = (keySize:number):KeySizeData => {
  let KeySizeFData:KeySizeData = {
    keySize:keySize,
  }
  return KeySizeFData
}

export interface Data{
  cipherParams :CipherParams
}

export interface CipherParams{
  toString?: (str?: string | JsonFormatterClass) => string
}

