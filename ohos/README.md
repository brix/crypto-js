# crypto-js

## Introduction
This project adapts the open-source [crypto-js](https://github.com/brix/crypto-js) library for OpenHarmony. It supports a range of cryptographic algorithms such as MD5, SHA-1, SHA-256, HMAC, HMAC-MD5, HMAC-SHA1, HMAC-SHA256, PBKDF2, AES, RC4, and DES.

![preview.gif](preview/preview.gif)

## How to Install
```shell
ohpm  install @ohos/crypto-js 
```
For details about the OpenHarmony ohpm environment configuration, see [OpenHarmony HAR](https://gitcode.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.en.md).
## How to Use
1. Import dependencies.
 ```
Supported by the latest version
   import { CryptoJS } from '@ohos/crypto-js' or
   import CryptoJS from '@ohos/crypto-js'
 ```
2. MD5 usage
   
   The MD5 message-digest algorithm is a widely used hash function producing a 128-bit (16-byte) hash value to ensure information integrity and consistency during transmission.
   
   MD5 features:
   1. Irreversibility: The original data cannot be calculated from the MD5 value.
   2. Uniqueness: Different original data has different MD5 values.

   Use of the MD5 algorithm in this library:
 ```
   // Step 1: Import CryptoJS on the page where it is needed.
   import { CryptoJS } from '@ohos/crypto-js'
   // Step 2: Call the MD5 algorithm in the business logic where it is needed.
   var hash = CryptoJS.MD5("123456") // The parameter is the content to be encrypted, and the return value is the encrypted data.
 ```
3. AES usage
   
   Advanced Encryption Standard (AES), also known as the Rijndael algorithm, is a block encryption standard.
   
   AES is symmetric encryption, which means that the same key is required for encryption and decryption.

   Use of the AES algorithm in this library:
 ```
    // Step 1: Import CryptoJS on the page where it is needed.
   import { CryptoJS } from '@ohos/crypto-js'
   // Step 2: Define the key used for encryption and decryption.
   var key = 'secret key 1234'
   // Step 3: Call the AES encryption in the business logic where it is needed.
   var encrypted = CryptoJS.AES.encrypt('hello world', key).toString()  // The parameter is the content and key for encryption.
   // Step 4: Call the AES decryption in the business logic where the above encrypted block needs to be decrypted. Note that the key must be the same.
   var decrypted = CryptoJS.AES.decrypt(encrypted, key) // The parameter is the encrypted content and key.
 ```
For details about how to use other encryption algorithms, including the following, see the [demo](https://gitcode.com/openharmony-sig/ohos_crypto_js/blob/master/entry/src/main/ets/pages/Index.ets), [XTS](https://gitcode.com/openharmony-sig/ohos_crypto_js/tree/master/entry/src/ohosTest/ets/test), and [CryptoJS documentation](https://cryptojs.gitbook.io/docs/):

sha1, sha256, sha224, sha512, sha384, sha3, ripemd160, hmac-md5, hmac-sha1, hmac-sha256, hmac-sha224, hmac-sha512, hmac-sha384, hmac-sha3, hmac-ripemd160
, pbkdf2, aes, tripledes, rc4, rabbit, rabbit-legacy, evpkdf, des, triple-des, format-openssl, format-hex, enc-latin1, enc-utf8, enc-hex, enc-utf16, enc-base64,
mode-cfb, mode-ctr, mode-ctr-gladman, mode-ofb, mode-ecb, pad-pkcs7, pad-ansix923, pad-iso10126, pad-iso97971, pad-zeropadding, pad-nopadding 


## Available APIs

- `crypto-js/md5`
- `crypto-js/sha1`
- `crypto-js/sha256`
- `crypto-js/sha224`
- `crypto-js/sha512`
- `crypto-js/sha384`
- `crypto-js/sha3`
- `crypto-js/ripemd160`
------

- `crypto-js/hmac-md5`
- `crypto-js/hmac-sha1`
- `crypto-js/hmac-sha256`
- `crypto-js/hmac-sha224`
- `crypto-js/hmac-sha512`
- `crypto-js/hmac-sha384`
- `crypto-js/hmac-sha3`
- `crypto-js/hmac-ripemd160`

------

- `crypto-js/pbkdf2`

------

- `crypto-js/aes`
- `crypto-js/tripledes`
- `crypto-js/rc4`
- `crypto-js/rabbit`
- `crypto-js/rabbit-legacy`
- `crypto-js/evpkdf`
- `crypto-js/des`
- `crypto-js/triple-des`

------

- `crypto-js/format-openssl`
- `crypto-js/format-hex`

------

- `crypto-js/enc-latin1`
- `crypto-js/enc-utf8`
- `crypto-js/enc-hex`
- `crypto-js/enc-utf16`
- `crypto-js/enc-base64`

------

- `crypto-js/mode-cfb`
- `crypto-js/mode-ctr`
- `crypto-js/mode-ctr-gladman`
- `crypto-js/mode-ofb`
- `crypto-js/mode-ecb`

------

- `crypto-js/pad-pkcs7`
- `crypto-js/pad-ansix923`
- `crypto-js/pad-iso10126`
- `crypto-js/pad-iso97971`
- `crypto-js/pad-zeropadding`
- `crypto-js/pad-nopadding`

## About obfuscation
- Code obfuscation, please see[Code Obfuscation](https://docs.openharmony.cn/pages/v5.0/zh-cn/application-dev/arkts-utils/source-obfuscation.md)
- If you want the crypto-js library not to be obfuscated during code obfuscation, you need to add corresponding exclusion rules in the obfuscation rule configuration file obfuscation-rules.txt：
```
-keep
./oh_modules/@ohos/crypto-js
```

## Constraints

This project has been verified in the following versions:
- DevEco Studio: NEXT Beta1-5.0.3.806, SDK: API 12 Release (5.0.0.66)
- DevEco Studio: 5.0.3.122, SDK: API 12 (5.0.0.17)
- DevEco Studio: 4.1.3.600, SDK: API 11 (4.1.0.67)

## Directory Structure
````
|---- crypto-js  
|     |---- entry                           # Sample code
|     |---- crypto                          # crypto-js library
|         |---- index.ts                    # External APIs
|         |---- src
|             |---- main
|                 |---- ets
|                     |---- components
|                         |---- crypto.ts   # Encryption encapsulation class
|     |---- README_EN.md                    # Readme                   
````

## How to Contribute
If you find any problem during the use, submit an [Issue](https://gitcode.com/pizice/ohos_crypto_js/issues) or [PR](https://gitcode.com/openharmony-sig/ohos_crypto_js/pulls) to us.

## License
This project is licensed under [MIT License](https://gitcode.com/openharmony-sig/ohos_crypto_js/blob/master/LICENSE).

## Known Issues
- Performance issues with the PBKDF2 algorithm
