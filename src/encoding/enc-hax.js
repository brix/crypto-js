import {
    WordArray
  } from '../core/core.js';

  /**
 * Hex encoding strategy.
 */
export const Hex = {
    /**
     * Converts a word array to a hex string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The hex string.
     *
     * @static
     *
     * @example
     *
     *     let hexString = CryptoJS.enc.Hex.stringify(wordArray);
     */
    stringify(wordArray) {
      // Shortcuts
      const {
        words,
        sigBytes
      } = wordArray;
  
      // Convert
      const hexChars = [];
      for (let i = 0; i < sigBytes; i++) {
        const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        hexChars.push((bite >>> 4).toString(16));
        hexChars.push((bite & 0x0f).toString(16));
      }
  
      return hexChars.join('');
    },
  
    /**
     * Converts a hex string to a word array.
     *
     * @param {string} hexStr The hex string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     let wordArray = CryptoJS.enc.Hex.parse(hexString);
     */
    parse(hexStr) {
      // Shortcut
      const hexStrLength = hexStr.length;
  
      // Convert
      const words = [];
      for (let i = 0; i < hexStrLength; i += 2) {
        words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
      }
  
      return new WordArray(words, hexStrLength / 2);
    }
  };