/**
 * Electronic Codebook block mode.
 */
import {
  BlockCipherMode
} from '../core/cipher-core.js';

export class ECB extends BlockCipherMode {
}
ECB.Encryptor = class extends ECB {
  processBlock(words, offset) {
    this._cipher.encryptBlock(words, offset);
  }
};
ECB.Decryptor = class extends ECB {
  processBlock(words, offset) {
    this._cipher.decryptBlock(words, offset);
  }
};
