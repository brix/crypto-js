import C from '../src/index';

let data = {};
beforeAll(() => {
  data.key = C.enc.Hex.parse('0001020304050607');
  data.iv = C.enc.Hex.parse('08090a0b0c0d0e0f');
});

describe('algo-des-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 100; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }
    C.algo.DES.createEncryptor(data.key, {
      iv: data.iv
    }).finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let des = C.algo.DES.createEncryptor(data.key, {
      iv: data.iv
    });
    for (let i = 0; i < 100; i++) {
      des.process('12345678901234567890123456789012345678901234567890') + '';
    }
    des.finalize() + '';
  });
});