import C from '../src/index';

describe('algo-pbkdf2-profile', () => {
  test('profileKeySize256Iterations20', () => {
    new C.algo.PBKDF2({
      keySize: 256 / 32,
      iterations: 20
    }).compute('password', 'ATHENA.MIT.EDUraeburn');
  });
});