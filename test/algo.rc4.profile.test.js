import C from '../src/index';

const data = {};
beforeAll(() => {
  data.key = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
});

describe('algo-rc4-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 500; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }
    C.algo.RC4.createEncryptor(data.key).finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let rc4 = C.algo.RC4.createEncryptor(data.key);
    for (let i = 0; i < 500; i++) {
      rc4.process('12345678901234567890123456789012345678901234567890') + '';
    }
    rc4.finalize() + '';
  });
});