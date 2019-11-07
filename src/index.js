import {
  Base,
  WordArray,
  BufferedBlockAlgorithm
} from './core/core.js';
import { Hasher } from './core/hasher';
import {
  X64Word,
  X64WordArray
} from './core/x64-core.js';
import {
  Cipher,
  StreamCipher,
  BlockCipherMode,
  CBC,
  BlockCipher,
  CipherParams,
  OpenSSLFormatter,
  SerializableCipher,
  OpenSSLKdf,
  PasswordBasedCipher
} from './core/cipher-core.js';

import { Utf16, Utf16BE, Utf16LE } from './encoding/enc-utf16.js';
import { Latin1 } from './encoding/enc-latin1';
import { Utf8 } from './encoding/enc-utf8';
import { Hex } from './encoding/enc-hax';
import { Base64 } from './encoding/enc-base64.js';
import { HMAC } from './algo/hmac/hmac.js';
import { MD5Algo, MD5, HmacMD5 } from './algo/hash/md5.js';
import { SHA1Algo, SHA1, HmacSHA1 } from './algo/hash/sha1.js';
import { SHA224Algo, SHA224, HmacSHA224 } from './algo/hash/sha224.js';
import { SHA256Algo, SHA256, HmacSHA256 } from './algo/hash/sha256.js';
import { SHA384Algo, SHA384, HmacSHA384 } from './algo/hash/sha384.js';
import { SHA512Algo, SHA512, HmacSHA512 } from './algo/hash/sha512.js';
import { SHA3Algo, SHA3, HmacSHA3 } from './algo/hash/sha3.js';
import { RIPEMD160Algo, RIPEMD160, HmacRIPEMD160 } from './algo/hash/ripemd160.js';
import { PBKDF2Algo, PBKDF2 } from './algo/pbkdf2/pbkdf2.js';
import { EvpKDFAlgo, EvpKDF } from './encryption/evpkdf.js';
import { AESAlgo, AES } from './encryption/aes.js';
import {
  DESAlgo,
  DES,
  TripleDESAlgo,
  TripleDES
} from './encryption/tripledes.js';
import { RabbitAlgo, Rabbit } from './encryption/rabbit.js';
import { RabbitLegacyAlgo, RabbitLegacy } from './encryption/rabbit-legacy.js';
import {
  RC4Algo,
  RC4,
  RC4DropAlgo,
  RC4Drop
} from './encryption/rc4.js';
import { CFB } from './mode/mode-cfb.js';
import { CTR } from './mode/mode-ctr.js';
import { CTRGladman } from './mode/mode-ctr-gladman.js';
import { ECB } from './mode/mode-ecb.js';
import { OFB } from './mode/mode-ofb.js';
import { Pkcs7 } from './pad/pad-pkcs7.js';
import { AnsiX923 } from './pad/pad-ansix923.js';
import { Iso10126 } from './pad/pad-iso10126.js';
import { Iso97971 } from './pad/pad-iso97971.js';
import { NoPadding } from './pad/pad-nopadding.js';
import { ZeroPadding } from './pad/pad-zeropadding.js';
import { HexFormatter } from './format/format-hex.js';

export default {
  lib: {
    Base,
    WordArray,
    BufferedBlockAlgorithm,
    Hasher,
    Cipher,
    StreamCipher,
    BlockCipherMode,
    BlockCipher,
    CipherParams,
    SerializableCipher,
    PasswordBasedCipher
  },

  x64: {
    Word: X64Word,
    WordArray: X64WordArray
  },

  enc: {
    Hex,
    Latin1,
    Utf8,
    Utf16,
    Utf16BE,
    Utf16LE,
    Base64
  },

  algo: {
    HMAC,
    MD5: MD5Algo,
    SHA1: SHA1Algo,
    SHA224: SHA224Algo,
    SHA256: SHA256Algo,
    SHA384: SHA384Algo,
    SHA512: SHA512Algo,
    SHA3: SHA3Algo,
    RIPEMD160: RIPEMD160Algo,

    PBKDF2: PBKDF2Algo,
    EvpKDF: EvpKDFAlgo,

    AES: AESAlgo,
    DES: DESAlgo,
    TripleDES: TripleDESAlgo,
    Rabbit: RabbitAlgo,
    RabbitLegacy: RabbitLegacyAlgo,
    RC4: RC4Algo,
    RC4Drop: RC4DropAlgo
  },

  mode: {
    CBC,
    CFB,
    CTR,
    CTRGladman,
    ECB,
    OFB
  },

  pad: {
    Pkcs7,
    AnsiX923,
    Iso10126,
    Iso97971,
    NoPadding,
    ZeroPadding
  },

  format: {
    OpenSSL: OpenSSLFormatter,
    Hex: HexFormatter
  },

  kdf: {
    OpenSSL: OpenSSLKdf
  },

  MD5,
  HmacMD5,
  SHA1,
  HmacSHA1,
  SHA224,
  HmacSHA224,
  SHA256,
  HmacSHA256,
  SHA384,
  HmacSHA384,
  SHA512,
  HmacSHA512,
  SHA3,
  HmacSHA3,
  RIPEMD160,
  HmacRIPEMD160,

  PBKDF2,
  EvpKDF,

  AES,
  DES,
  TripleDES,
  Rabbit,
  RabbitLegacy,
  RC4,
  RC4Drop
};
