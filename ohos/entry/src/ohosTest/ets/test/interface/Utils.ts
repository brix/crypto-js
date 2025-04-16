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
import StartOptions from '@ohos.app.ability.StartOptions'

export class Utils{
  static  getCryptoCreate(){
    return CryptoJS.algo.SHA384.create()
  }

  static  getCryptoSHA256HMAC() {
    return CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
}

  static getCryptoJSRandom(){
    return CryptoJS.lib.WordArray.random(8)
  }

  static getHMAC(){
    return CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA384, CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
  }

  static getModePaddingFn(){
    return CryptoJS.algo.AES.createEncryptor(CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), {
      mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding
    })

  }

  static getCryptoJSSHA1(){
    return CryptoJS.algo.SHA1.create()
  }

  static getCryptoJSSHA256(){
    return CryptoJS.algo.SHA256.create()
  }

  static getCreateEncryptor(data){
    return CryptoJS.algo.TripleDES.createEncryptor(data.key, {
      iv: data.iv
    })

  }

  static getRabbit(){
    return CryptoJS.algo.Rabbit.createEncryptor(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'))
  }

  static getEncryptSaltA(data){
    return CryptoJS.AES.encrypt('Test', 'Pass',SaltAFn(data.saltA))
  }

  static getEncryptSaltB(data){
    return CryptoJS.AES.encrypt('Test', 'Pass',SaltAFn(data.saltB))
  }

  static getCryptoJSIsEqual(num:number){
    return CryptoJS.PBKDF2('password', CryptoJS.enc.Hex.parse('1234567878563412'), {
      keySize: num / 32, iterations: 5
    }).toString()

  }

  static getKeySize128321200IsEqual(){
    return CryptoJS.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size',{
      keySize: 128 / 32, iterations: 1200
    })
  }

  static getPasswordIsEqualKeySize128321200(){
    return CryptoJS.PBKDF2('password', 'ATHENA.MIT.EDUraeburn', {
      keySize: 128 / 32, iterations: 1200
    })
  }

  static getPBKDF2IsEqualkeySize128321200(num:number){
    return CryptoJS.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase exceeds block size',{
      keySize: num / 32, iterations: 1200
    })

  }

  static getPBKDF2IsEqualkeySize128321200equals(){
    return CryptoJS.PBKDF2('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'pass phrase equals block size',{
      keySize: 256 / 32, iterations: 1200
    })

  }

  static getPBKDF2Iterations50(){

    return CryptoJS.PBKDF2(CryptoJS.enc.Hex.parse('f09d849e'), 'EXAMPLE.COMpianist', {
      keySize: 256 / 32, iterations: 50
    })

  }

  static getLibWordArray():CryptoJS.lib.WordArray{
    return CryptoJS.lib.WordArray.create([0xdddddd00], 3)
  }

  static getHexModelPad(){
    return CryptoJS.algo.TripleDES.createEncryptor(CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), {
      mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding
    })

  }

  static getEightWordArray(num:number){
    return CryptoJS.lib.WordArray.create([0x12345678], num)
  }

  static getEightBytesWordArray(num:number){
    return CryptoJS.lib.WordArray.create([0x12345678, 0x12345678], num)
  }

  static getEightBytesArray(){
    return CryptoJS.lib.WordArray.create([0x12345678])
  }

  static getCreateWordArray(){
    return CryptoJS.lib.WordArray.create()
  }

  static getMD5Create(){
    return CryptoJS.algo.MD5.create()
  }

  static getAlgoDES(){
    return CryptoJS.algo.DES.createEncryptor(CryptoJS.enc.Hex.parse('0123456789abcdef'),{mode:CryptoJS.mode.ECB, padding:CryptoJS.pad.NoPadding})
  }

  static getAlgoSHA3(){
    return CryptoJS.algo.SHA3.create()
  }

  static getAlgoHMACryptoJS(){
    return CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
  }

  static getRC4CreateEncryptor(){
    return CryptoJS.algo.RC4.createEncryptor(CryptoJS.enc.Hex.parse('0123456789abcdef'))
  }

  static getSHA512(){
    return CryptoJS.algo.SHA512.create()
  }

  static getSHA224(){
    return CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA224, CryptoJS.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
  }

  static getCreateRabbitLegacyEncryptor(){
    return CryptoJS.algo.RabbitLegacy.createEncryptor(CryptoJS.enc.Hex.parse('00000000000000000000000000000000'))
  }

  static getData(data){
  return data.obj.init.prototype
}

  static getObjCloneData(data){
    return data.objClone.init.prototype
  }

  static getInitArg(data){
    return data.objClone.initArg
  }

  static getObjInitArg(data){
    return data.obj.initArg
  }

  static getObjInitArg2(data){
    return data.obj2.initArg
  }

  static getObjClone(data){
    return data.objClone
  }


  static getObj(data){
    return data.obj
  }

  static getObj2(data){
    return data.obj2
  }

  static getMixinMethod(data){
    return data.Obj.mixinMethod
  }

  static getMixinsMixinMethod(data){
    return data.mixins.mixinMethod
  }

  static getObjInitFired(data){
    return data.obj.initFired
  }

  static getObjInitFired2(data){
    return data.obj2.initFired
  }

  static getObjSuper(data){
    return data.obj.$super
  }

  static getObjSuper2(data){
    return data.obj2.$super
  }

  static getObjExtend(data){
    return data.obj.extend
  }

  static getObjToString(data){
    return data.obj.toString
  }

  static getOverridesToString(data){
    return data.overrides.toString
  }

  static getObjInit(data){
    return data.obj.init
  }

  static getOverridesInit(data){
    return data.overrides.init
  }

  static getMixins(data){
    return data.mixins
  }

  static getOverrides(data){
    return data.overrides
  }
}

export interface SaltAData{
  saltA?:object
}

export let SaltAFn = (saltA:object):SaltAData => {
  let SaltAFnData:SaltAData = {
    saltA:saltA,
  }
  return SaltAFnData
}

export interface SaltBData{
  saltB?:object
}

export let SaltBFn = (saltB:object):SaltBData => {
  let SaltBFnData:SaltBData = {
    saltB:saltB,
  }
  return SaltBFnData
}

export interface SaltABData{
  saltA?:object
  saltB?:object
}

export let SaltABFn = (saltA:object,saltB:object):SaltABData => {
  let SaltABFnData:SaltABData = {
    saltA:saltA,
    saltB:saltB
  }
  return SaltABFnData
}

export interface SaltHasherData{
  saltA?:object
  hasher?:object
}

export let SaltHasherFn = (saltA:object,hasher:object):SaltHasherData => {
  let SaltHasherFnData:SaltHasherData = {
    saltA: saltA,
    hasher:hasher
  }
  return SaltHasherFnData
}

export interface HasherData{
  hasher?:object
}

export let HasherFn = (hasher:object):HasherData => {
  let HasherFnData:HasherData = {
    hasher:hasher,
  }
  return HasherFnData
}


class Overrides {
  initFired: boolean = false;
  initArg:ESObject;
  init(arg:ESObject) {
    this.initFired = true;
    this.initArg = arg;
  }
  toString(){};
}

class Mixins {
  mixinMethod(){};
}

class Obj {
  objMethod(){};
}

class ObjClone {
  objCloneMethod(){};
}

export interface Data {
  overrides?: Overrides;
  mixins?: Mixins;
  obj?: Obj;
  objClone?: ObjClone;
  obj2?: Obj;
}

export function getDataCryptoJS(data,C){
  data = {};
  data.overrides = {
    init: function (arg){
      this.initFired = true;
      this.initArg = arg;
    },

    toString: function () {

    }

  };

  data.mixins = {
    mixinMethod: function () {

    }
  };

  data.obj = C.extend(data.overrides);
  data.obj.mixIn(data.mixins);
  data.obj2 = data.obj.create('argValue');
  data.objClone = data.obj2.clone();
  return data
}

export function randomFun(cry,random){
  cry.random = random
}

export function createRandomFun(cry){
  cry.random = (nBytes:number):CryptoJS.lib.WordArray=> {
    let words:Object[] = [];
    for (let i = 0; i < nBytes; i += 4) {
      words.push([0x11223344]);
    }

    return CryptoJS.lib.WordArray.create(words, nBytes);
  };
}
