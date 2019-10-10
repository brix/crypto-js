import C from '../src/index';

const WORD_ARRAY_TEST = {
  'sigBytes': 16,
  'words': [1410418970, 1874077036, 1337395728, -598079323]
};
describe('algo-md5-profile', () => {
  test('profileSinglePartMessage', () => {
    let singlePartMessage = '';
    let i = 0;
    while (i < 500) {
      singlePartMessage += '12345678901234567890123456789012345678901234567890';
      i++;
    }
    expect(C.algo.MD5.create().finalize(singlePartMessage)).toMatchObject(WORD_ARRAY_TEST);
  });

  test('profileMultiPartMessage', () => {
    let i = 0;
    const  md5 = C.algo.MD5.create();
    while (i < 500) {
      md5.update('12345678901234567890123456789012345678901234567890');
      i++;
    }
    expect(md5.finalize()).toMatchObject(WORD_ARRAY_TEST);
  });
});