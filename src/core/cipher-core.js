/* eslint-disable no-use-before-define */

import {
  Base,
  WordArray,
  BufferedBlockAlgorithm
} from '../core/core.js';
import {
  Base64
} from '../encoding/enc-base64.js';
import {
  EvpKDFAlgo
} from '../encryption/evpkdf.js';
import { isString } from '../utils';
import { Pkcs7 } from '../pad/pad-pkcs7';


/**
 * Abstract base cipher template.
 *
 * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
 * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
 * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
 * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
 */
export class Cipher extends BufferedBlockAlgorithm {
  /**
   * Initializes a newly created cipher.
   *
   * @param {number} xformMode Either the encryption or decryption transormation mode constant.
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @example
   *
   *     const cipher = new Cipher(
   *       CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray }
   *     );
   */
  constructor(xformMode, key, cfg) {
    super();

    this.keySize = 128 / 32;
    this.ivSize = 128 / 32;

    /**
     * Configuration options.
     *
     * @property {WordArray} iv The IV to use for this operation.
     */
    this.cfg = Object.assign(new Base(), cfg);

    // Store transform mode and key
    this._xformMode = xformMode;
    this._key = key;

    // Set initial values
    this.reset();
  }

  /**
   * Creates this cipher in encryption mode.
   *
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {Cipher} A cipher instance.
   *
   * @static
   *
   * @example
   *
   *     const cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  static createEncryptor(key, cfg) {
    return new this(this._ENC_XFORM_MODE, key, cfg);
  }

  /**
   * Creates this cipher in decryption mode.
   *
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {Cipher} A cipher instance.
   *
   * @static
   *
   * @example
   *
   *     const cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  static createDecryptor(key, cfg) {
    return new this(this._DEC_XFORM_MODE, key, cfg);
  }

  /**
   * Creates shortcut functions to a cipher's object interface.
   *
   * @param {Cipher} cipher The cipher to create a helper for.
   *
   * @return {Object} An object with encrypt and decrypt shortcut functions.
   *
   * @static
   *
   * @example
   *
   *     const AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
   */
  static _createHelper(SubCipher) {
    const selectCipherStrategy = (key) => {
      if (isString(key)) {
        return PasswordBasedCipher;
      }
      return SerializableCipher;
    };

    return {
      encrypt(message, key, cfg) {
        return selectCipherStrategy(key).encrypt(SubCipher, message, key, cfg);
      },

      decrypt(ciphertext, key, cfg) {
        return selectCipherStrategy(key).decrypt(SubCipher, ciphertext, key, cfg);
      }
    };
  }

  /**
   * Resets this cipher to its initial state.
   *
   * @example
   *
   *     cipher.reset();
   */
  reset() {
    // Reset data buffer
    super.reset.call(this);

    // Perform concrete-cipher logic
    this._doReset();
  }

  /**
   * Adds data to be encrypted or decrypted.
   *
   * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
   *
   * @return {WordArray} The data after processing.
   *
   * @example
   *
   *     const encrypted = cipher.process('data');
   *     const encrypted = cipher.process(wordArray);
   */
  process(dataUpdate) {
    // Append
    this._append(dataUpdate);

    // Process available blocks
    return this._process();
  }

  /**
   * Finalizes the encryption or decryption process.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   *
   * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
   *
   * @return {WordArray} The data after final processing.
   *
   * @example
   *
   *     const encrypted = cipher.finalize();
   *     const encrypted = cipher.finalize('data');
   *     const encrypted = cipher.finalize(wordArray);
   */
  finalize(dataUpdate) {
    // Final data update
    if (dataUpdate) {
      this._append(dataUpdate);
    }

    // Perform concrete-cipher logic
    const finalProcessedData = this._doFinalize();

    return finalProcessedData;
  }
}
Cipher._ENC_XFORM_MODE = 1;
Cipher._DEC_XFORM_MODE = 2;

/**
 * Abstract base stream cipher template.
 *
 * @property {number} blockSize
 *
 *     The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
 */
export class StreamCipher extends Cipher {
  constructor(...args) {
    super(...args);

    this.blockSize = 1;
  }

  _doFinalize() {
    // Process partial blocks
    const finalProcessedBlocks = this._process(!!'flush');

    return finalProcessedBlocks;
  }
}

/**
 * Abstract base block cipher mode template.
 */
export class BlockCipherMode extends Base {
  /**
   * Initializes a newly created mode.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @example
   *
   *     const mode = new BlockCipherMode(cipher, iv.words);
   */
  constructor(cipher, iv) {
    super();

    this._cipher = cipher;
    this._iv = iv;
  }

  /**
   * Creates this mode for encryption.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @static
   *
   * @example
   *
   *     const mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
   */
  static createEncryptor(cipher, iv) {
    return new this.Encryptor(cipher, iv);
  }

  /**
   * Creates this mode for decryption.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @static
   *
   * @example
   *
   *     const mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
   */
  static createDecryptor(cipher, iv) {
    return new this.Decryptor(cipher, iv);
  }
}

function xorBlock(words, offset, blockSize) {
  const _words = words;
  let block;

  // Shortcut
  const iv = this._iv;

  // Choose mixing block
  if (iv) {
    block = iv;

    // Remove IV for subsequent blocks
    this._iv = undefined;
  } else {
    block = this._prevBlock;
  }

  // XOR blocks
  for (let i = 0; i < blockSize; i++) {
    _words[offset + i] ^= block[i];
  }
}

/**
 * Cipher Block Chaining mode.
 */

/**
 * Abstract base CBC mode.
 */
export class CBC extends BlockCipherMode { }
/**
 * CBC encryptor.
 */
CBC.Encryptor = class extends CBC {
  /**
   * Processes the data block at offset.
   *
   * @param {Array} words The data words to operate on.
   * @param {number} offset The offset where the block starts.
   *
   * @example
   *
   *     mode.processBlock(data.words, offset);
   */
  processBlock(words, offset) {
    // Shortcuts
    const cipher = this._cipher;
    const {
      blockSize
    } = cipher;

    // XOR and encrypt
    xorBlock.call(this, words, offset, blockSize);
    cipher.encryptBlock(words, offset);

    // Remember this block to use with next block
    this._prevBlock = words.slice(offset, offset + blockSize);
  }
};
/**
 * CBC decryptor.
 */
CBC.Decryptor = class extends CBC {
  /**
   * Processes the data block at offset.
   *
   * @param {Array} words The data words to operate on.
   * @param {number} offset The offset where the block starts.
   *
   * @example
   *
   *     mode.processBlock(data.words, offset);
   */
  processBlock(words, offset) {
    // Shortcuts
    const cipher = this._cipher;
    const {
      blockSize
    } = cipher;

    // Remember this block to use with next block
    const thisBlock = words.slice(offset, offset + blockSize);

    // Decrypt and XOR
    cipher.decryptBlock(words, offset);
    xorBlock.call(this, words, offset, blockSize);

    // This block becomes the previous block
    this._prevBlock = thisBlock;
  }
};

/**
 * Abstract base block cipher template.
 *
 * @property {number} blockSize
 *
 *    The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
 */
export class BlockCipher extends Cipher {
  constructor(xformMode, key, cfg) {
    /**
     * Configuration options.
     *
     * @property {Mode} mode The block mode to use. Default: CBC
     * @property {Padding} padding The padding strategy to use. Default: Pkcs7
     */
    super(xformMode, key, Object.assign({
      mode: CBC,
      padding: Pkcs7
    },
      cfg,
    ));

    this.blockSize = 128 / 32;
  }

  reset() {
    let modeCreator;

    // Reset cipher
    super.reset.call(this);

    // Shortcuts
    const {
      cfg
    } = this;
    const {
      iv,
      mode
    } = cfg;

    // Reset block mode
    if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
      modeCreator = mode.createEncryptor;
    } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
      modeCreator = mode.createDecryptor;
      // Keep at least one block in the buffer for unpadding
      this._minBufferSize = 1;
    }

    this._mode = modeCreator.call(mode, this, iv && iv.words);
    this._mode.__creator = modeCreator;
  }

  _doProcessBlock(words, offset) {
    this._mode.processBlock(words, offset);
  }

  _doFinalize() {
    let finalProcessedBlocks;

    // Shortcut
    const {
      padding
    } = this.cfg;

    // Finalize
    if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
      // Pad data
      padding.pad(this._data, this.blockSize);

      // Process final blocks
      finalProcessedBlocks = this._process(!!'flush');
    } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
      // Process final blocks
      finalProcessedBlocks = this._process(!!'flush');

      // Unpad data
      padding.unpad(finalProcessedBlocks);
    }

    return finalProcessedBlocks;
  }
}

/**
 * A collection of cipher parameters.
 *
 * @property {WordArray} ciphertext The raw ciphertext.
 * @property {WordArray} key The key to this ciphertext.
 * @property {WordArray} iv The IV used in the ciphering operation.
 * @property {WordArray} salt The salt used with a key derivation function.
 * @property {Cipher} algorithm The cipher algorithm.
 * @property {Mode} mode The block mode used in the ciphering operation.
 * @property {Padding} padding The padding scheme used in the ciphering operation.
 * @property {number} blockSize The block size of the cipher.
 * @property {Format} formatter
 *    The default formatting strategy to convert this cipher params object to a string.
 */
export class CipherParams extends Base {
  /**
   * Initializes a newly created cipher params object.
   *
   * @param {Object} cipherParams An object with any of the possible cipher parameters.
   *
   * @example
   *
   *     let cipherParams = new CipherParams({
   *         ciphertext: ciphertextWordArray,
   *         key: keyWordArray,
   *         iv: ivWordArray,
   *         salt: saltWordArray,
   *         algorithm: CryptoJS.algo.AES,
   *         mode: CryptoJS.mode.CBC,
   *         padding: CryptoJS.pad.PKCS7,
   *         blockSize: 4,
   *         formatter: CryptoJS.format.OpenSSL
   *     });
   */
  constructor(cipherParams) {
    super();

    this.mixIn(cipherParams);
  }

  /**
   * Converts this cipher params object to a string.
   *
   * @param {Format} formatter (Optional) The formatting strategy to use.
   *
   * @return {string} The stringified cipher params.
   *
   * @throws Error If neither the formatter nor the default formatter is set.
   *
   * @example
   *
   *     let string = cipherParams + '';
   *     let string = cipherParams.toString();
   *     let string = cipherParams.toString(CryptoJS.format.OpenSSL);
   */
  toString(formatter) {
    return (formatter || this.formatter).stringify(this);
  }
}

/**
 * OpenSSL formatting strategy.
 */
export const OpenSSLFormatter = {
  /**
   * Converts a cipher params object to an OpenSSL-compatible string.
   *
   * @param {CipherParams} cipherParams The cipher params object.
   *
   * @return {string} The OpenSSL-compatible string.
   *
   * @static
   *
   * @example
   *
   *     let openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
   */
  stringify(cipherParams) {
    let wordArray;

    // Shortcuts
    const {
      ciphertext,
      salt
    } = cipherParams;

    // Format
    if (salt) {
      wordArray = new WordArray([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
    } else {
      wordArray = ciphertext;
    }

    return wordArray.toString(Base64);
  },

  /**
   * Converts an OpenSSL-compatible string to a cipher params object.
   *
   * @param {string} openSSLStr The OpenSSL-compatible string.
   *
   * @return {CipherParams} The cipher params object.
   *
   * @static
   *
   * @example
   *
   *     let cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
   */
  parse(openSSLStr) {
    let salt;

    // Parse base64
    const ciphertext = Base64.parse(openSSLStr);

    // Shortcut
    const ciphertextWords = ciphertext.words;

    // Test for salt
    if (ciphertextWords[0] === 0x53616c74 && ciphertextWords[1] === 0x65645f5f) {
      // Extract salt
      salt = new WordArray(ciphertextWords.slice(2, 4));

      // Remove salt from ciphertext
      ciphertextWords.splice(0, 4);
      ciphertext.sigBytes -= 16;
    }

    return new CipherParams({
      ciphertext,
      salt
    });
  }
};

/**
 * A cipher wrapper that returns ciphertext as a serializable cipher params object.
 */
export class SerializableCipher extends Base {
  /**
   * Encrypts a message.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {WordArray|string} message The message to encrypt.
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {CipherParams} A cipher params object.
   *
   * @static
   *
   * @example
   *
   *     let ciphertextParams = CryptoJS.lib.SerializableCipher
   *       .encrypt(CryptoJS.algo.AES, message, key);
   *     let ciphertextParams = CryptoJS.lib.SerializableCipher
   *       .encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
   *     let ciphertextParams = CryptoJS.lib.SerializableCipher
   *       .encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
   */
  static encrypt(cipher, message, key, cfg) {
    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Encrypt
    const encryptor = cipher.createEncryptor(key, _cfg);
    const ciphertext = encryptor.finalize(message);

    // Shortcut
    const cipherCfg = encryptor.cfg;

    // Create and return serializable cipher params
    return new CipherParams({
      ciphertext,
      key,
      iv: cipherCfg.iv,
      algorithm: cipher,
      mode: cipherCfg.mode,
      padding: cipherCfg.padding,
      blockSize: encryptor.blockSize,
      formatter: _cfg.format
    });
  }

  /**
   * Decrypts serialized ciphertext.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {WordArray} The plaintext.
   *
   * @static
   *
   * @example
   *
   *     let plaintext = CryptoJS.lib.SerializableCipher
   *       .decrypt(CryptoJS.algo.AES, formattedCiphertext, key,
   *         { iv: iv, format: CryptoJS.format.OpenSSL });
   *     let plaintext = CryptoJS.lib.SerializableCipher
   *       .decrypt(CryptoJS.algo.AES, ciphertextParams, key,
   *         { iv: iv, format: CryptoJS.format.OpenSSL });
   */
  static decrypt(cipher, ciphertext, key, cfg) {
    let _ciphertext = ciphertext;

    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Convert string to CipherParams
    _ciphertext = this._parse(_ciphertext, _cfg.format);

    // Decrypt
    const plaintext = cipher.createDecryptor(key, _cfg).finalize(_ciphertext.ciphertext);

    return plaintext;
  }

  /**
   * Converts serialized ciphertext to CipherParams,
   * else assumed CipherParams already and returns ciphertext unchanged.
   *
   * @param {CipherParams|string} ciphertext The ciphertext.
   * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
   *
   * @return {CipherParams} The unserialized ciphertext.
   *
   * @static
   *
   * @example
   *
   *     let ciphertextParams = CryptoJS.lib.SerializableCipher
   *       ._parse(ciphertextStringOrParams, format);
   */
  static _parse(ciphertext, format) {
    if (isString(ciphertext)) {
      return format.parse(ciphertext, this);
    }
    return ciphertext;
  }
}
/**
 * Configuration options.
 *
 * @property {Formatter} format
 *
 *    The formatting strategy to convert cipher param objects to and from a string.
 *    Default: OpenSSL
 */
SerializableCipher.cfg = Object.assign(
  new Base(), {
  format: OpenSSLFormatter
},
);

/**
 * OpenSSL key derivation function.
 */
export const OpenSSLKdf = {
  /**
   * Derives a key and IV from a password.
   *
   * @param {string} password The password to derive from.
   * @param {number} keySize The size in words of the key to generate.
   * @param {number} ivSize The size in words of the IV to generate.
   * @param {WordArray|string} salt
   *     (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
   *
   * @return {CipherParams} A cipher params object with the key, IV, and salt.
   *
   * @static
   *
   * @example
   *
   *     let derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
   *     let derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
   */
  execute(password, keySize, ivSize, salt) {
    let _salt = salt;

    // Generate random salt
    if (!_salt) {
      _salt = WordArray.random(64 / 8);
    }

    // Derive key and IV
    const key = new EvpKDFAlgo({
      keySize: keySize + ivSize
    }).compute(password, _salt);

    // Separate key and IV
    const iv = new WordArray(key.words.slice(keySize), ivSize * 4);
    key.sigBytes = keySize * 4;

    // Return params
    return new CipherParams({
      key,
      iv,
      salt: _salt
    });
  }
};

/**
 * A serializable cipher wrapper that derives the key from a password,
 * and returns ciphertext as a serializable cipher params object.
 */
export class PasswordBasedCipher extends SerializableCipher {
  /**
   * Encrypts a message using a password.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {WordArray|string} message The message to encrypt.
   * @param {string} password The password.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {CipherParams} A cipher params object.
   *
   * @static
   *
   * @example
   *
   *     let ciphertextParams = CryptoJS.lib.PasswordBasedCipher
   *       .encrypt(CryptoJS.algo.AES, message, 'password');
   *     let ciphertextParams = CryptoJS.lib.PasswordBasedCipher
   *       .encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
   */
  static encrypt(cipher, message, password, cfg) {
    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Derive key and other params
    const derivedParams = _cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

    // Add IV to config
    _cfg.iv = derivedParams.iv;

    // Encrypt
    const ciphertext = SerializableCipher.encrypt
      .call(this, cipher, message, derivedParams.key, _cfg);

    // Mix in derived params
    ciphertext.mixIn(derivedParams);

    return ciphertext;
  }

  /**
   * Decrypts serialized ciphertext using a password.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
   * @param {string} password The password.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {WordArray} The plaintext.
   *
   * @static
   *
   * @example
   *
   *     let plaintext = CryptoJS.lib.PasswordBasedCipher
   *       .decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password',
   *         { format: CryptoJS.format.OpenSSL });
   *     let plaintext = CryptoJS.lib.PasswordBasedCipher
   *       .decrypt(CryptoJS.algo.AES, ciphertextParams, 'password',
   *         { format: CryptoJS.format.OpenSSL });
   */
  static decrypt(cipher, ciphertext, password, cfg) {
    let _ciphertext = ciphertext;

    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Convert string to CipherParams
    _ciphertext = this._parse(_ciphertext, _cfg.format);

    // Derive key and other params
    const derivedParams = _cfg.kdf
      .execute(password, cipher.keySize, cipher.ivSize, _ciphertext.salt);

    // Add IV to config
    _cfg.iv = derivedParams.iv;

    // Decrypt
    const plaintext = SerializableCipher.decrypt
      .call(this, cipher, _ciphertext, derivedParams.key, _cfg);

    return plaintext;
  }
}
/**
 * Configuration options.
 *
 * @property {KDF} kdf
 *     The key derivation function to use to generate a key and IV from a password.
 *     Default: OpenSSL
 */
PasswordBasedCipher.cfg = Object.assign(SerializableCipher.cfg, {
  kdf: OpenSSLKdf
});