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

import abilityTest from './Ability.test';
import CryptoJS_enc_Utf8 from './cryptojs/enc/Utf8.test';
import CryptoJS_MD5 from './cryptojs/MD5.test';
import aesProfileTest from './aes-profile.test';
import aesTest from './aes-test.test';
import blowfishTest from './blowfish-test.test';
import cipherTest from './cipher-test.test';
import configTest from './config-test.test';
import desProfileTest from './des-profile.test';
import desTest from './des-test.test';
import encBase64Test from './enc-base64-test.test';
import encHexTest from './enc-hex-test.test';
import encLatin1Test from './enc-latin1-test.test';
import encUtf8Test from './enc-utf8-test.test';
import encUtf16Test from './enc-utf16-test.test';
import evpkdfProfileTest from './evpkdf-profile.test';
import evpkdfTest from './evpkdf-test.test';
import formatOpensslTest from './format-openssl-test.test';
import hmacMd5ProfileTest from './hmac-md5-profile.test';
import hmacSha224Test from './hmac-sha224-test.test';
import hmacSha256Test from './hmac-sha256-test.test';
import hmacSha384Test from './hmac-sha384-test.test';
import hmacSha512Test from './hmac-sha512-test.test';
import kdfOpensslTest from './kdf-openssl-test.test';
import libBaseTest from './lib-base-test.test';
import libCipherparamsTest from './lib-cipherparams-test.test';
import libPasswordbasedcipherTest from './lib-passwordbasedcipher-test.test';
import libSerializablecipherTest from './lib-serializablecipher-test.test';
import libTypedarraysTest from './lib-typedarrays-test.test';
import libWordarrayTest from './lib-wordarray-test.test';
import md5ProfileTest from './md5-profile.test';
import md5Test from './md5-test.test';
import modeCbcTest from './mode-cbc-test.test';
import modeCfbTest from './mode-cfb-test.test';
import modeCtrTest from './mode-ctr-test.test';
import modeEcbTest from './mode-ecb-test.test';
import modeOfbTest from './mode-ofb-test.test';
import padAnsix923Test from './pad-ansix923-test.test';
import padIso10126Test from './pad-iso10126-test.test';
import padIso97971Test from './pad-iso97971-test.test';
import padPkcs7Test from './pad-pkcs7-test.test';
import padZeropadding7Test from './pad-zeropadding-test.test';
import pbkdf2ProfileTest from './pbkdf2-profile.test';
import pbkdf2Test from './pbkdf2-test.test';
import rabbitLegacyTest from './rabbit-legacy-test.test';
import rabbitProfileTest from './rabbit-profile.test';
import rabbitTest from './rabbit-test.test';
import rc4ProfileTest from './rc4-profile.test';
import rc4Test from './rc4-test.test';
import ripemd160Test from './ripemd160-test.test';
import sha1ProfileTest from './sha1-profile.test';
import sha1Test from './sha1-test.test';
import sha3ProfileTest from './sha3-profile.test';
import sha3Test from './sha3-test.test';
import sha224Test from './sha224-test.test';
import sha256ProfileTest from './sha256-profile.test';
import sha256Test from './sha256-test.test';
import sha384Test from './sha384-test.test';
import sha512ProfileTest from './sha512-profile.test';
import sha512Test from './sha512-test.test';
import tripledesProfileTest from './tripledes-profile.test';
import tripledesTest from './tripledes-test.test';
import x64WordTest from './x64-word-test.test';
import x64WordarrayTest from './x64-wordarray-test.test';
import telephonyPerfJsunit from './TestInterfaceResponseTime.test';

export default function testsuite() {
  abilityTest();
  CryptoJS_enc_Utf8();
  CryptoJS_MD5();
  aesProfileTest();
  aesTest();
  blowfishTest();
  cipherTest();
  configTest();
  desProfileTest();
  desTest();
  encBase64Test();
  encHexTest();
  encLatin1Test();
  encUtf8Test();
  encUtf16Test();
  evpkdfProfileTest();
  evpkdfTest();
  formatOpensslTest();
  hmacMd5ProfileTest();
  hmacSha224Test();
  hmacSha256Test();
  hmacSha384Test();
  hmacSha512Test();
  kdfOpensslTest();
  libBaseTest();
  libCipherparamsTest();
  libPasswordbasedcipherTest();
  libSerializablecipherTest();
  libTypedarraysTest();
  libWordarrayTest();
  md5ProfileTest();
  md5Test();
  modeCbcTest();
  modeCfbTest();
  modeCtrTest();
  modeEcbTest();
  modeOfbTest();
  padAnsix923Test();
  padIso10126Test();
  padIso97971Test();
  padPkcs7Test();
  padZeropadding7Test();
  pbkdf2ProfileTest();
  pbkdf2Test();
  rabbitLegacyTest();
  rabbitProfileTest();
  rabbitTest();
  rc4ProfileTest();
  rc4Test();
  ripemd160Test();
  sha1ProfileTest();
  sha1Test();
  sha3ProfileTest();
  sha3Test();
  sha224Test();
  sha256ProfileTest();
  sha256Test();
  sha384Test();
  sha512ProfileTest();
  sha512Test();
  tripledesProfileTest();
  tripledesTest();
  x64WordTest();
  x64WordarrayTest();
  telephonyPerfJsunit()
}