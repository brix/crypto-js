/**
 * Counter block mode.
 */
import {
  BlockCipherMode
} from '../core/cipher-core.js';

export class CTR extends BlockCipherMode {
}
CTR.Encryptor = class extends CTR {
  processBlock(words, offset) {
    const _words = words;

    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;
    const iv = this._iv;
    let counter = this._counter;

    // Generate keystream
    if (iv) {
      this._counter = iv.slice(0);
      counter = this._counter;

      // Remove IV for subsequent blocks
      this._iv = undefined;
    }
    const keystream = counter.slice(0);
    cipher.encryptBlock(keystream, 0);

    // Increment counter
    counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;

    // Encrypt
    for (let i = 0; i < blockSize; i++) {
      _words[offset + i] ^= keystream[i];
    }
  }
};
CTR.Decryptor = CTR.Encryptor;
