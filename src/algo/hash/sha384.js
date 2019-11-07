import {
  X64Word,
  X64WordArray
} from '../../core/x64-core.js';
import { SHA512Algo } from './sha512.js';

/**
 * SHA-384 hash algorithm.
 */
export class SHA384Algo extends SHA512Algo {
  _doReset() {
    this._hash = new X64WordArray([
      new X64Word(0xcbbb9d5d, 0xc1059ed8),
      new X64Word(0x629a292a, 0x367cd507),
      new X64Word(0x9159015a, 0x3070dd17),
      new X64Word(0x152fecd8, 0xf70e5939),
      new X64Word(0x67332667, 0xffc00b31),
      new X64Word(0x8eb44a87, 0x68581511),
      new X64Word(0xdb0c2e0d, 0x64f98fa7),
      new X64Word(0x47b5481d, 0xbefa4fa4)
    ]);
  }

  _doFinalize() {
    const hash = super._doFinalize.call(this);

    hash.sigBytes -= 16;

    return hash;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA384('message');
 *     var hash = CryptoJS.SHA384(wordArray);
 */
export const SHA384 = SHA512Algo._createHelper(SHA384Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA384(message, key);
 */
export const HmacSHA384 = SHA512Algo._createHmacHelper(SHA384Algo);
