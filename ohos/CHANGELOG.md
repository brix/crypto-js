## v2.0.4
- 添加index.d.ts声明文件
- 优化_doCryptBlock方法，还原为源库的二阶数组写法
- 在DevEco Studio: NEXT Beta1-5.0.3.806, SDK:API12 Release(5.0.0.66)上验证通过

## v2.0.4-rc.1
- 添加index.d.ts声明文件

## v2.0.4-rc.0
- 优化_doCryptBlock方法，还原为源库的二阶数组写法

## v2.0.3
- 适配源库4.2.0版本，更改PBKDF2的默认哈希算法和迭代，以通过使用默认配置来防止弱安全性。
- 支持blowfish加密
- 修复不兼容API9问题
- 优化hasOwn方法

## v2.0.3-rc.1
- 适配源库4.2.0版本，更改PBKDF2的默认哈希算法和迭代，以通过使用默认配置来防止弱安全性。
- 支持blowfish加密

## v2.0.3-rc.0
- 修复不兼容API9问题

## v2.0.2
- ArkTs语法规则整改

## v2.0.1
- 支持export default和export两种引入方式
- 适配DevEco Studio:  4.0 Canary1(4.0.3.212)
- 适配SDK: API 10 Release(4.0.8.3)

## v2.0.0
- 包管理工具由npm切换为ohpm
- 适配DevEco Studio: 3.1 Beta2(3.1.0.400)
- 适配SDK: API9 Release(3.2.11.9)

## v1.0.6

1. 完善DevEco Studio 3.1 Beta1及以上版本适配
2. 去掉polyfill接口，采用原生sdk接口

## v1.0.5

1. 适配DevEco Studio 3.1 Beta1及以上版本

## v1.0.4

1. 修复加解密不可逆的问题

## v1.0.3

1. 修复加密算法中特殊字符以及中文字符加密错误的问题

## v1.0.2

1. 适配API9

2. 直接引用源库使用，删除本库的绝大部分逻辑，仅将客制化的部分抽出作为lib

## v1.0.1

- 已实现功能
  1. sha224
  2. sha384
  3. sha3
  4. hmac-sha224
  5. hmac-sha384
  6. hmac-sha3
  7. pbkdf2
  8. aes
  9. tripledes
  10. rc4
  11. rabbit
  12. rabbit-legacy
  13. evpkdf
  14. format-openssl
  15. format-hex
  16. enc-latin1
  17. enc-utf8
  18. enc-hex
  19. enc-utf16
  20. enc-base64
  21. mode-cfb
  22. mode-ctr
  23. mode-ctr-gladman
  24. mode-ofb
  25. mode-ecb
  26. pad-pkcs7
  27. pad-ansix923
  28. pad-iso10126
  29. pad-iso97971
  30. pad-zeropadding
  31. pad-nopadding

## v1.0.0

- 已实现功能
  1. md5
  2. sha1
  3. sha256
  4. sha512
  5. ripemd160
  6. hmac-md5
  7. hmac-sha1
  8. hmac-sha256
  9. hmac-sha512
  10. hmac-ripemd160