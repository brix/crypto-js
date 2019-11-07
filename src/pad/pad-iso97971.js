import {
  WordArray,
} from '../core/core.js';
import {
  ZeroPadding,
} from './pad-zeropadding.js';

/**
 * ISO/IEC 9797-1 Padding Method 2.
 */
export const Iso97971 = {
  pad(data, blockSize) {
    // Add 0x80 byte
    data.concat(new WordArray([0x80000000], 1));

    // Zero pad the rest
    ZeroPadding.pad(data, blockSize);
  },

  unpad(data) {
    const _data = data;

    // Remove zero padding
    ZeroPadding.unpad(_data);

    // Remove one more byte -- the 0x80 byte
    _data.sigBytes--;
  }
};
