import C from '../src/index';

let data = {};
beforeAll(() => {
  data.key =  C.lib.WordArray.random(128/8);
});

describe('algo-hmac-md5-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 500; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }
    new C.algo.HMAC(C.algo.MD5, data.key).finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let hmac = new C.algo.HMAC(C.algo.MD5, data.key);
    for (let i = 0; i < 500; i++) {
      hmac.update('12345678901234567890123456789012345678901234567890');
    }
    hmac.finalize() + '';
  });
});