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
import CryptoJS from '@ohos/crypto-js'

export interface BufferData{
  buffer:ArrayBuffer
}

export let BufferFn = (buffer:ArrayBuffer):BufferData => {
  let BufferFnData:BufferData = {
    buffer: buffer,
  }
  return BufferFnData
}

export interface KeyIVCiphertextData{
  key:object
  iv:object
  ciphertext:object
}

export let KeyIVCiphertextFn = (key:object ,iv:object,ciphertext:object):KeyIVCiphertextData => {
  let KeyIVCiphertextFnData:KeyIVCiphertextData = {
    key: key,
    iv: iv,
    ciphertext:ciphertext
  }
  return KeyIVCiphertextFnData
}

export interface KeyIVData{
  key:object
  iv:object
}

export let KeyIVFn = (key:object ,iv:object):KeyIVData => {
  let KeyIVFnData:KeyIVData = {
    key: key,
    iv: iv,
  }
  return KeyIVFnData
}

export interface KeyIVSaltData{
  key:object
  iv:object
  salt:object
}

export let KeyIVSaltFn = (key:object ,iv:object,  salt:object):KeyIVSaltData => {
  let KeyIVSaltFnData:KeyIVSaltData = {
    key: key,
    iv: iv,
    salt:salt
  }
  return KeyIVSaltFnData
}

export interface IVData {
  iv:object
}

export interface KeyData {
  key:CryptoJS.lib.WordArray
}

export let KeyFn = (key:CryptoJS.lib.WordArray):KeyData => {
  let KeyFnData:KeyData = {
    key: key,
  }
  return KeyFnData
}

export interface HasNoMsgData {
  key:object
  iv:object
  message:object

}

export let HasNoMsgFn = (key:object,
                          iv:object,
                          message:object):HasNoMsgData => {
  let HasNoMsgFnData:HasNoMsgData = {
    key: key,
    iv: iv,
    message: message,

  }
  return HasNoMsgFnData
}

export interface Data {
  key:CryptoJS.lib.WordArray
  iv:CryptoJS.lib.WordArray
  message:CryptoJS.lib.WordArray
  random:(nBytes: number)=>CryptoJS.lib.WordArray
}

export interface Key {
  sigBytes:number
  words: Array<number> | Array<Array<number>>
  clone: () => Iv
}

export interface Iv {
  sigBytes:number
  words: Array<number>
}

export interface Random {
  random:Function
}
