import C from '../src/index';

describe('algo-sha1-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    for (let i = 0; i < 500; i++) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
    }

    new C.algo.SHA1().finalize(singlePartMessage) + '';
  });

  test('profileMultiPartMessage', () => {
    let sha1 = new C.algo.SHA1();
    for (let i = 0; i < 500; i++) {
      sha1.update('12345678901234567890123456789012345678901234567890');
    }
    sha1.finalize() + '';
  });
});