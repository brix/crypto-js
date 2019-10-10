import {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher
} from './core.js';
import {
  X64Word,
  X64WordArray
} from './x64-core.js';
import {
  Cipher,
  StreamCipher,
  BlockCipherMode,
  CBC,
  Pkcs7,
  BlockCipher,
  CipherParams,
  OpenSSLFormatter,
  SerializableCipher,
  OpenSSLKdf,
  PasswordBasedCipher
} from './cipher-core.js';

import { MD5Algo, MD5, HmacMD5 } from './md5.js';
import { HMAC } from './hmac.js';

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
    Utf8
  },

  algo: {
    HMAC,
    MD5: MD5Algo
  },

  mode: {
    CBC
  },

  pad: {
    Pkcs7
  },

  format: {
    OpenSSL: OpenSSLFormatter
  },

  kdf: {
    OpenSSL: OpenSSLKdf
  },

  MD5,
  HmacMD5
};
