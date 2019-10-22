import C from '../src/index';

describe('algo-evpkdf-test', () => {
  test('testVector', () => {
    expect(C.EvpKDF('password', 'saltsalt', { keySize: (256+128)/32 }).toString()).toBe('fdbdf3419fff98bdb0241390f62a9db35f4aba29d77566377997314ebfc709f20b5ca7b1081f94b1ac12e3c8ba87d05a');
  });

  // There are no official test vectors that I could find, and the EVP implementation is short on comments.
  // Need to use the C code to generate more test vectors.
  // The iteration count in particular needs to be tested.
  test('testInputIntegrity', () => {
    let password = new C.lib.WordArray([0x12345678]);
    let salt = new C.lib.WordArray([0x12345678]);

    let expectedPassword = password.toString();
    let expectedSalt = salt.toString();

    C.EvpKDF(password, salt);

    expect(password.toString()).toBe(expectedPassword);
    expect(salt.toString()).toBe(expectedSalt);
  });

  test('testHelper', () => {
    expect(C.EvpKDF('password', 'saltsalt', { keySize: (256+128)/32 }).toString()).toBe(new C.algo.EvpKDF({ keySize: (256+128)/32 }).compute('password', 'saltsalt').toString());
  });
});