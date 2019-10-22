import {BufferedBlockAlgorithm, Base} from './core';
import {HMAC} from '../algo/hmac/hmac';


/**
 * Abstract hasher template.
 *
 * @property {number} blockSize
 *
 *     The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
 */

export class Hasher extends BufferedBlockAlgorithm {

 

    constructor(cfg) {
      super();
  
      this.blockSize = 512 / 32;
  
      /**
       * Configuration options.
       */
      this.cfg = Object.assign(new Base(), cfg);
  
      // Set initial values
      this.reset();
    }
  
    /**
     * Creates a shortcut function to a hasher's object interface.
     *
     * @param {Hasher} SubHasher The hasher to create a helper for.
     *
     * @return {Function} The shortcut function.
     *
     * @static
     *
     * @example
     *
     *     let SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
     */
    static _createHelper(SubHasher) {
      return (message, cfg) => new SubHasher(cfg).finalize(message);
    }
  
    /**
     * Creates a shortcut function to the HMAC's object interface.
     *
     * @param {Hasher} SubHasher The hasher to use in this HMAC helper.
     *
     * @return {Function} The shortcut function.
     *
     * @static
     *
     * @example
     *
     *     let HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
     */
    static _createHmacHelper(SubHasher) {
      return (message, key) => new HMAC(SubHasher, key).finalize(message);
    }
  
    /**
     * Resets this hasher to its initial state.
     *
     * @example
     *
     *     hasher.reset();
     */
    reset() {
      // Reset data buffer
      super.reset.call(this);
  
      // Perform concrete-hasher logic
      this._doReset();
    }
  
    /**
     * Updates this hasher with a message.
     *
     * @param {WordArray|string} messageUpdate The message to append.
     *
     * @return {Hasher} This hasher.
     *
     * @example
     *
     *     hasher.update('message');
     *     hasher.update(wordArray);
     */
    update(messageUpdate) {
      // Append
      this._append(messageUpdate);
  
      // Update the hash
      this._process();
  
      // Chainable
      return this;
    }
  
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {WordArray|string} messageUpdate (Optional) A final message update.
     *
     * @return {WordArray} The hash.
     *
     * @example
     *
     *     let hash = hasher.finalize();
     *     let hash = hasher.finalize('message');
     *     let hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate) {
      // Final message update
      if (messageUpdate) {
        this._append(messageUpdate);
      }
  
      // Perform concrete-hasher logic
      const hash = this._doFinalize();
  
      return hash;
    }
  }