import C from '../src/index';

describe('algo-sha256-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 500; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }
    new C.algo.SHA256().finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let sha256 = new C.algo.SHA256();
    for (let i = 0; i < 500; i++) {
      sha256.update('12345678901234567890123456789012345678901234567890');
    }
    sha256.finalize() + '';
  });
});