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

import prompt from '@system.prompt';
import CryptoJS from '@ohos/crypto-js'
import  router from "@ohos.router"

@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller()

  build() {
    Scroll(this.scroller) {
      Column() {
        Button($r('app.string.Jump_page'))
          .fontSize(15)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            router.pushUrl({
              url: "pages/TestDESTime",
            })
          })

        Text('md5')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.MD5("123456").toString()
            prompt.showToast({ message: 'md5=' + hash })
            console.log('md5=' + hash)
          })
        Text('sha1')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.SHA1("123456").toString()
            prompt.showToast({ message: 'sha1=' + hash })
            console.log('sha1=' + hash)
          })
          
        Text('sha256')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.SHA256("123456").toString()
            prompt.showToast({ message: 'sha256=' + hash })
            console.log('sha256=' + hash)
          })
        Text('sha512')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.SHA512("123456").toString()
            prompt.showToast({ message: 'sha512=' + hash })
            console.log('sha512=' + hash)
          })
        Text('sha224')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.SHA224("123456").toString()
            prompt.showToast({ message: "sha224=" + hash })
            console.log("sha224=" + hash);
          })
        Text('sha384')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.SHA384("123456").toString()
            prompt.showToast({ message: "sha384=" + hash })
            console.log("sha384=" + hash);
          })
        Text('sha3')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.SHA3("123456").toString()
            prompt.showToast({ message: "sha3=" + hash })
            console.log("sha3=" + hash);
          })
        Text('ripemd160')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.RIPEMD160("123456").toString()
            prompt.showToast({ message: "ripemd160=" + hash })
            console.log("ripemd160=" + hash);
          })
        Text('hmac-md5')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacMD5('123456', '123456').toString()
            prompt.showToast({ message: 'hmac-md5=' + hash })
            console.log('hmac-md5=' + hash)
          })
        Text('hmac-sha1')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacSHA1('123456', '123456').toString()
            prompt.showToast({ message: 'hmac-sha1=' + hash })
            console.log('hmac-sha1=' + hash)
          })
        Text('hmac-sha256')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacSHA256('123456', '123456').toString()
            prompt.showToast({ message: 'hmac-sha256=' + hash })
            console.log('hmac-sha256=' + hash)
          })
        Text('hmac-sha224')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacSHA224('123456', '123456').toString()
            prompt.showToast({ message: "hmac-sha224=" + hash })
            console.log("hmac-sha224=" + hash);
          })
        Text('hmac-sha512')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacSHA512('123456', '123456').toString()
            prompt.showToast({ message: 'hmac-sha512=' + hash })
            console.log('hmac-sha512=' + hash)
          })
        Text('hmac-sha384')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacSHA384('123456', '123456').toString()
            prompt.showToast({ message: "hmac-sha384=" + hash })
            console.log("hmac-sha384=" + hash);
          })
        Text('hmac-sha3')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacSHA3('123456', '123456').toString()
            prompt.showToast({ message: "hmac-sha3=" + hash })
            console.log("hmac-sha3=" + hash);
          })
        Text('hmac-ripemd160')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hash: string = CryptoJS.HmacRIPEMD160('123456', '123456').toString()
            prompt.showToast({ message: "hmac-ripemd160=" + hash })
            console.log("hmac-ripemd160=" + hash);
          })
        Text('enc-latin1-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Latin1.parse('Hello, World!')
            console.log("enc-latin1-parse =" + words.toString());
            prompt.showToast({ message: "enc-latin1-parse=" + words.toString() })
          })
        Text('enc-latin1-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Latin1.parse('Hello, World!')
            let latin1: string = CryptoJS.enc.Latin1.stringify(words);
            console.log("enc-latin1-stringify =" + latin1);
            prompt.showToast({ message: "enc-latin1-stringify=" + latin1 })
          })
        Text('enc-utf8-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse('0x999999')
            console.log("enc-utf8-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf8-parse=" + words.toString() })
          })
        Text('enc-utf8-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse('0x999999')
            let utf8: string = CryptoJS.enc.Utf8.stringify(words);
            console.log("enc-utf8-stringify =" + utf8);
            prompt.showToast({ message: "enc-utf8-stringify=" + utf8 })
          })
        Text('enc-utf16-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf16.parse('Hello, World!')
            console.log("enc-utf16-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf16-parse=" + words.toString() })
          })
        Text('enc-utf16-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf16.parse('Hello, World!')
            let utf16: string = CryptoJS.enc.Utf16.stringify(words);
            console.log("enc-utf16-stringify =" + utf16);
            prompt.showToast({ message: "enc-utf16-stringify=" + utf16 })
          })
        Text('enc-utf16be-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf16BE.parse('Hello, World!')
            console.log("enc-utf16be-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf16be-parse=" + words.toString() })
          })
        Text('enc-utf16be-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf16BE.parse('Hello, World!')
            let utf16be: string = CryptoJS.enc.Utf16BE.stringify(words);
            console.log("enc-utf16be-stringify =" + utf16be);
            prompt.showToast({ message: "enc-utf16be-stringify=" + utf16be })
          })
        Text('enc-utf16le-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf16LE.parse('Hello, World!')
            console.log("enc-utf16le-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf16le-parse=" + words.toString() })
          })
        Text('enc-utf16le-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Utf16LE.parse('Hello, World!')
            let utf16le: string = CryptoJS.enc.Utf16LE.stringify(words);
            console.log("enc-utf16le-stringify =" + utf16le);
            prompt.showToast({ message: "enc-utf16le-stringify=" + utf16le })
          })
        Text('enc-hex-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('48656c6c6f2c20576f726c6421')
            console.log("enc-hex-parse =" + words.toString());
            prompt.showToast({ message: "enc-hex-parse=" + words.toString() })
          })
        Text('enc-hex-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let words: CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse('48656c6c6f2c20576f726c6421')
            let hex: string = CryptoJS.enc.Hex.stringify(words);
            console.log("enc-hex-stringify =" + hex);
            prompt.showToast({ message: "enc-hex-stringify=" + hex })
          })
        Text('WordArray-random')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let salt: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random(128 / 8)
            prompt.showToast({ message: "WordArray-random=" + salt.toString() })
            console.log("WordArray-random=" + salt.toString());
          })
        Text('lib-WordArray-create')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let random: string = CryptoJS.lib.WordArray.create().toString()
            prompt.showToast({ message: "WordArray-create=" + JSON.stringify(random) })
            console.log("WordArray-create=" + JSON.stringify(random));
          })
        Text('evpkdf-compute')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let evpkdf: string = CryptoJS.algo.EvpKDF.create({
              'keySize': 8,
              'iterations': 20
            })
              .compute('560f1e45b', '1234',)
              .toString()
            prompt.showToast({ message: "evpkdf-compute=" + evpkdf })
            console.log("evpkdf-compute=" + evpkdf);
          })
        Text('pbkdf2-compute')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let kdfArg: Record<string, number> = {
              'keySize': 8,
              'iterations': 20
            }
            let result: string = CryptoJS.algo.PBKDF2.create(kdfArg)
              .compute('560f1e45bf60b893', '1234',)
              .toString()
            prompt.showToast({ message: "pbkdf2-compute=" + result })
            console.log("pbkdf2-compute=" + result);
          })
        Text('OpenSSL-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let ciphertext: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
            let salt: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x01234567, 0x89abcdef]);

            let openSSLStr: string = CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create({
              ciphertext: ciphertext,
              salt: salt
            }));
            console.log("OpenSSL-stringify = " + openSSLStr);
            prompt.showToast({ message: 'OpenSSL-stringify=' + openSSLStr })
          })
        Text('OpenSSL-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let ciphertext: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
            let salt: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0x01234567, 0x89abcdef]);

            let openSSLStr: string = CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create({
              ciphertext: ciphertext,
              salt: salt
            }));
            console.log("OpenSSL-parse = " + CryptoJS.format.OpenSSL.parse(openSSLStr)
              .ciphertext
              .toString());
            prompt.showToast({
              message: 'OpenSSL-parse=' + CryptoJS.format.OpenSSL.parse(openSSLStr)
                .ciphertext
                .toString()
            })
          })
        Text('format-hex-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let ciphertext: string = CryptoJS.lib.WordArray.create([0x12345678]).toString();
            let cipSalt: Record<string, string> = {
              'ciphertext': ciphertext
            }
            let hexStr: string = CryptoJS.format.Hex.stringify(CryptoJS.lib.CipherParams.create(cipSalt));
            console.log("format-hex-stringify = " + hexStr);
            prompt.showToast({ message: 'format-hex-stringify=' + hexStr })
          })
        Text('format-hex-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let hexxStr: string = CryptoJS.format.Hex.parse('0x12345678').toString(CryptoJS.format.Hex)
            console.log("format-hex-parse = " + hexxStr);
            prompt.showToast({ message: 'format-hex-parse=' + hexxStr })
          })
        Text('enc-base64-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let wordArray: CryptoJS.lib.WordArray = CryptoJS.enc.Base64.parse('SGVsbG8sIFdvcmxkIQ==')
            console.log("enc-base64-parse =" + wordArray.toString());
            prompt.showToast({ message: "enc-base64-parse=" + wordArray.toString() })
          })
        Text('enc-base64-stringify')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let wordArray: CryptoJS.lib.WordArray = CryptoJS.enc.Base64.parse('SGVsbG8sIFdvcmxkIQ==')
            let result: string = CryptoJS.enc.Base64.stringify(wordArray);
            console.log("enc-base64-stringify =" + result);
            prompt.showToast({ message: "enc-base64-stringify=" + result })
          })
        Text('enc-base64url-parse')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let key: string = "u-rXsMB_aegAnzC_CJt27plLGNqOfR2EHI5o2ro1NO";
            let wordArray: CryptoJS.lib.WordArray = CryptoJS.enc.Base64url.parse(key)
            console.log("enc-base64url-parse =" + wordArray.toString());
            prompt.showToast({ message: "enc-base64url-parse=" + wordArray.toString() })
          })
        Text('RC4 encrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.RC4.encrypt('hello world!', 'secret key 12345').toString();
            console.log("RC4 encrypt= " + encrypted);
            prompt.showToast({ message: 'RC4 encrypt=' + encrypted })
          })
        Text('RC4 decrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.RC4.encrypt('hello world!', 'secret key 12345').toString()
            let decrypted: string = CryptoJS.RC4.decrypt(encrypted, "secret key 12345").toString()
            console.log("RC4 decrypt= " + decrypted)
            prompt.showToast({ message: 'RC4 decrypt=' + decrypted })
          })
        Text('RC4Drop encrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let drop: Record<string, number> = {
              'drop': 3072 / 4
            }
            let encrypted: string = CryptoJS.RC4Drop.encrypt('hello world!!', 'secret key 123456', drop).toString()
            console.log("RC4Drop encrypt = " + encrypted);
            prompt.showToast({ message: 'RC4Drop encrypt=' + encrypted })
          })
        Text('RC4Drop decrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let drop: Record<string, number> = {
              'drop': 3072 / 4
            }
            let encrypted: string = CryptoJS.RC4Drop.encrypt('hello world!!', 'secret key 123456', drop).toString()
            let decrypted: string = CryptoJS.RC4Drop.decrypt(encrypted, 'secret key 123456', drop).toString()
            console.log("RC4Drop decrypt = " + decrypted);
            prompt.showToast({ message: 'RC4Drop decrypt=' + decrypted })
          })
        Text('Rabbit encrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.Rabbit.encrypt('hello', 'secret key 12345').toString()
            console.log("Rabbit encrypt= " + encrypted);
            prompt.showToast({ message: 'Rabbit encrypt= ' + encrypted })
          })
        Text('Rabbit decrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let decrypted: string = CryptoJS.Rabbit.decrypt(CryptoJS.Rabbit.encrypt('hello', 'secret key 12345'), 'secret key 12345').toString()
            console.log("Rabbit decrypt= " + decrypted);
            prompt.showToast({ message: 'Rabbit decrypt= ' + decrypted })
          })
        Text('Rabbit-Legacy encrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.RabbitLegacy.encrypt('hello', 'secret key 12345').ciphertext.toString()
            console.log("Rabbit-Legacy encrypt= " + encrypted);
            prompt.showToast({ message: 'Rabbit-Legacy encrypt= ' + encrypted })
          })
        Text('Rabbit-Legacy decrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let decrypted: string = CryptoJS.RabbitLegacy.decrypt(CryptoJS.RabbitLegacy.encrypt('hello', 'secret key 12345'), 'secret key 12345').toString()
            console.log("Rabbit-Legacy decrypt= " + decrypted);
            prompt.showToast({ message: 'Rabbit-Legacy decrypt= ' + decrypted })
          })
        Text('DES encrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.DES.encrypt('hello', 'secret key 123').toString();
            console.log("DES encrypt = " + encrypted);
            prompt.showToast({ message: 'DES encrypt=' + encrypted })
          })
        Text('DES decrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let decrypted: string  = CryptoJS.DES.decrypt(CryptoJS.DES.encrypt('hello', 'secret key 123')
              .toString(), 'secret key 123').toString()
            console.log("DES decrypt = " + decrypted);
            prompt.showToast({ message: 'DES decrypt=' + decrypted })
          })
        Text('Triple DES encrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.TripleDES.encrypt('hello world', 'secret key 1234').toString();
            console.log("TripleDES encrypt= " + encrypted);
            prompt.showToast({ message: 'TripleDES encrypt=' + encrypted })
          })
        Text('Triple DES decrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let decrypted: string  = CryptoJS.TripleDES.decrypt(CryptoJS.TripleDES.encrypt('hello world', 'secret key 1234')
              .toString(), 'secret key 1234').toString()
            console.log("TripleDES decrypt = " + decrypted);
            prompt.showToast({ message: 'TripleDES decrypt=' + decrypted })
          })
        Text('AES encrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.AES.encrypt('hello world', 'secret key 1234').toString();
            console.log("AES encrypt = " + encrypted);
            prompt.showToast({ message: 'AES encrypt =' + encrypted })
          })
        Text('AES decrypt')
          .fontSize(20)
          .margin(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let encrypted: string = CryptoJS.AES.encrypt('hello world', 'secret key 1234').toString();
            let decrypted: string = CryptoJS.AES.decrypt(encrypted, 'secret key 1234').toString();
            console.log("AES decrypt = " + decrypted);
            prompt.showToast({ message: 'AES decrypt =' + decrypted })
          })
      }
      .width('100%')
      .padding({ bottom: 180 })
    }.height('100%')
    .scrollable(ScrollDirection.Vertical)
    .scrollBarWidth(0)
    .backgroundColor(Color.White)
  }
}