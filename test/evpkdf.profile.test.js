import C from '../src/index';

describe('algo-evpkdf-profile', () => {
  test('profileKeySize256Iterations20', () => {
    new C.algo.EvpKDF({ keySize: 256/32, iterations: 20 }).compute('password', 'ATHENA.MIT.EDUraeburn');
  });
});