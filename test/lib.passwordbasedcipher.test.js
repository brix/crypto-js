import C from '../src/index';

describe('lib-passwordbasedcipher-test', () => {
  test('testEncrypt', () => {
    // Compute actual
    let actual = C.lib.PasswordBasedCipher.encrypt(C.algo.AES, 'Hello, World!', 'password');

    // Compute expected
    let aes = C.algo.AES.createEncryptor(actual.key, {
      iv: actual.iv
    });
    let expected = aes.finalize('Hello, World!');
    expect(actual.ciphertext.toString()).toBe(expected.toString());
  });

  test('testDecrypt', () => {
    let ciphertext = C.lib.PasswordBasedCipher.encrypt(C.algo.AES, 'Hello, World!', 'password');
    let plaintext = C.lib.PasswordBasedCipher.decrypt(C.algo.AES, ciphertext, 'password');
    expect(plaintext.toString(C.enc.Utf8)).toBe('Hello, World!');
  });
});