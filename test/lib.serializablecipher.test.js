import C from '../src/index';

let data = {};

beforeAll(() => {
  data.message = new C.lib.WordArray([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
  data.key = new C.lib.WordArray([0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f]);
  data.iv = new C.lib.WordArray([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
});

describe('lib-serializablecipher-test', () => {
  test('testEncrypt', () => {
    // Compute expected
    let aes = C.algo.AES.createEncryptor(data.key, {
      iv: data.iv
    });
    let ciphertext = aes.finalize(data.message);
    let expected = new C.lib.CipherParams({
      ciphertext: ciphertext,
      key: data.key,
      iv: data.iv,
      algorithm: C.algo.AES,
      mode: aes.cfg.mode,
      padding: aes.cfg.padding,
      blockSize: aes.blockSize,
      formatter: C.format.OpenSSL
    });
    let actual = C.lib.SerializableCipher.encrypt(C.algo.AES, data.message, data.key, {
      iv: data.iv
    });

    expect(actual.toString()).toBe(expected.toString());
    expect(actual.ciphertext.toString()).toBe(expected.ciphertext.toString());
    expect(actual.key.toString()).toBe(expected.key.toString());
    expect(actual.iv.toString()).toBe(expected.iv.toString());
    expect(actual.algorithm).toBe(expected.algorithm);
    expect(actual.mode).toBe(expected.mode);
    expect(actual.padding).toBe(expected.padding);
    expect(actual.blockSize).toBe(expected.blockSize);
  });

  test('testDecrypt', () => {
    let encrypted = C.lib.SerializableCipher.encrypt(C.algo.AES, data.message, data.key, {
      iv: data.iv
    }) + '';
    let decrypted = C.lib.SerializableCipher.decrypt(C.algo.AES, encrypted, data.key, {
      iv: data.iv
    });
    expect(decrypted.toString()).toBe(data.message.toString());
  });
});