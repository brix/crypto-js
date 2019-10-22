/**
 * Output Feedback block mode.
 */
import {
  BlockCipherMode
} from '../core/cipher-core.js';

export class OFB extends BlockCipherMode {
}
OFB.Encryptor = class extends OFB {
  processBlock(words, offset) {
    const _words = words;

    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;
    const iv = this._iv;
    let keystream = this._keystream;

    // Generate keystream
    if (iv) {
      this._keystream = iv.slice(0);
      keystream = this._keystream;

      // Remove IV for subsequent blocks
      this._iv = undefined;
    }
    cipher.encryptBlock(keystream, 0);

    // Encrypt
    for (let i = 0; i < blockSize; i++) {
      _words[offset + i] ^= keystream[i];
    }
  }
};
OFB.Decryptor = OFB.Encryptor;
