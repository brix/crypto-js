import C from '../src/index';

describe('algo-sha3-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 500; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }

    new C.algo.SHA3().finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let sha3 = new C.algo.SHA3();
    for (let i = 0; i < 500; i++) {
      sha3.update('12345678901234567890123456789012345678901234567890');
    }
    sha3.finalize() + '';
  });
});