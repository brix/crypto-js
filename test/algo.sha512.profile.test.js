import C from '../src/index';

describe('algo-sha512-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 500; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }
    new C.algo.SHA512().finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let sha512 = new C.algo.SHA512();
    for (let i = 0; i < 500; i++) {
      sha512.update('12345678901234567890123456789012345678901234567890');
    }
    sha512.finalize() + '';
  });
});