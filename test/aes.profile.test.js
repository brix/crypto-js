import C from '../src/index.js';

let data = {};
beforeAll(() => {
  data.key = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f');
  data.iv = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
});

describe('algo-aes-profile', () => {

  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 500; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }
    C.algo.AES.createEncryptor(data.key, {
      iv: data.iv
    }).finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let aes = C.algo.AES.createEncryptor(data.key, {
      iv: data.iv
    });
    for (let i = 0; i < 500; i++) {
      aes.process('12345678901234567890123456789012345678901234567890') + '';
    }
    aes.finalize() + '';
  });
});