import {
    WordArray
  } from '../core/core.js';

/**
 * Latin1 encoding strategy.
 */
  export const Latin1 = {
    /**
     * Converts a word array to a Latin1 string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The Latin1 string.
     *
     * @static
     *
     * @example
     *
     *     let latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
     */
    stringify(wordArray) {
      // Shortcuts
      const {
        words,
        sigBytes
      } = wordArray;
  
      // Convert
      const latin1Chars = [];
      for (let i = 0; i < sigBytes; i++) {
        const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        latin1Chars.push(String.fromCharCode(bite));
      }
  
      return latin1Chars.join('');
    },
  
    /**
     * Converts a Latin1 string to a word array.
     *
     * @param {string} latin1Str The Latin1 string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     let wordArray = CryptoJS.enc.Latin1.parse(latin1String);
     */
    parse(latin1Str) {
      // Shortcut
      const latin1StrLength = latin1Str.length;
  
      // Convert
      const words = [];
      for (let i = 0; i < latin1StrLength; i++) {
        words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
      }
  
      return new WordArray(words, latin1StrLength);
    }
  };