# crypto-js

## 简介
   本软件是移植开源软件 [crypto-js](https://github.com/brix/crypto-js) 源码在OpenHarmony上进行功能适配，在OpenHarmony上已支持原库crypto-js的功能，目前crypto-js已支持的算法有：MD5、SHA-1、SHA-256、HMAC、HMAC-MD5、HMAC-SHA1、HMAC-SHA256、PBKDF2、AES、RC4、DES等。

![preview.gif](preview/preview.gif)

## 下载安装
```shell
ohpm  install @ohos/crypto-js 
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitcode.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明
1. 引入依赖
 ```
最新版本支持
   import { CryptoJS } from '@ohos/crypto-js' 或者
   import CryptoJS from '@ohos/crypto-js'
 ```
2. md5算法使用
   
   md5信息摘要算法（英语：md5 Message-Digest Algorithm），一种被广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。
   
   md5特点：
   1. 不可逆性 --- 根据 MD5 值计算不出原始数据
   2. 唯一性 --- 不同原始数据会有不同的 MD5 值

   md5算法在本库的使用：
 ```
   //第一步在需要使用到的页面，导入CryptoJS
   import { CryptoJS } from '@ohos/crypto-js'
   //第二步在需要使用到md5的业务逻辑，调用md5算法
   var hash = CryptoJS.MD5("123456") //传参是需要加密的内容，返回值是加密后的数据
 ```
3. aes算法使用
   
   AES算法全称Advanced Encryption Standard，又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。
   
   AES是对称加密，所以加密解密都需要用到同一个秘钥。

   AES算法在本库的使用：
 ```
    //第一步在需要使用到的页面，导入CryptoJS
   import { CryptoJS } from '@ohos/crypto-js'
   //第二步定义加密解密需要用到的key
   var key = 'secret key 1234'
   //第三步在需要使用AES加密的业务逻辑，调用AES加密
   var encrypted = CryptoJS.AES.encrypt('hello world', key).toString()  //传参为加密内容及秘钥
   //第四步在需要把上面的加密块解密的业务逻辑，调用AES解密，注意key必须相同
   var decrypted = CryptoJS.AES.decrypt(encrypted, key) //传参为加密后的内容及秘钥
 ```
其它加密算法使用方式，如sha1、sha256、sha224、sha512、sha384、sha3、ripemd160、hmac-md5、hmac-sha1、hmac-sha256、hmac-sha224、hmac-sha512、hmac-sha384、hmac-sha3、hmac-ripemd160
、pbkdf2、aes、tripledes、rc4、rabbit、rabbit-legacy、evpkdf、des、triple-des、format-openssl、format-hex、enc-latin1、enc-utf8、enc-hex、enc-utf16、enc-base64、
mode-cfb、mode-ctr、mode-ctr-gladman、mode-ofb、mode-ecb、pad-pkcs7、pad-ansix923、pad-iso10126、pad-iso97971、pad-zeropadding、pad-nopadding。

更多使用方法请参照 [demo](https://gitcode.com/openharmony-sig/ohos_crypto_js/blob/master/entry/src/main/ets/pages/Index.ets) 和 [XTS](https://gitcode.com/openharmony-sig/ohos_crypto_js/tree/master/entry/src/ohosTest/ets/test) 及 [参考原库使用文档](https://cryptojs.gitbook.io/docs/)


## 接口列表

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

## 关于混淆
- 代码混淆，请查看[代码混淆简介](https://docs.openharmony.cn/pages/v5.0/zh-cn/application-dev/arkts-utils/source-obfuscation.md)
- 如果希望crypto-js库在代码混淆过程中不会被混淆，需要在混淆规则配置文件obfuscation-rules.txt中添加相应的排除规则：
```
-keep
./oh_modules/@ohos/crypto-js
```

## 约束与限制

在下述版本验证通过：
- DevEco Studio: NEXT Beta1-5.0.3.806, SDK:API12 Release(5.0.0.66)
- DevEco Studio : 5.0.3.122, SDK: API12 (5.0.0.17)
- DevEco Studio : 4.1.3.600, SDK: API11 (4.1.0.67)

## 目录结构
````
|---- crypto-js  
|     |---- entry  # 示例代码文件夹
|     |---- crypto  # crypto-js库文件夹
|         |---- index.ts  # 对外接口
|         |---- src
|             |---- main
|                 |---- ets
|                     |---- components
|                         |---- crypto.ts  # 加密封装类
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitcode.com/openharmony-sig/ohos_crypto_js/issues) ，当然，也非常欢迎发 [PR](https://gitcode.com/openharmony-sig/ohos_crypto_js/pulls) 共建。

## 开源协议
本项目基于 [MIT License](https://gitcode.com/openharmony-sig/ohos_crypto_js/blob/master/LICENSE) ，请自由地享受和参与开源。

## 遗留问题
- pbkdf2算法性能问题