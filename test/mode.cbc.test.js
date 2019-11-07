import C from '../src/index';

let data = {};
beforeAll(() => {
  data.message = new C.lib.WordArray([
    0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
    0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f
  ]);
  data.key = new C.lib.WordArray([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
  data.iv = new C.lib.WordArray([0x30313233, 0x34353637, 0x38393a3b, 0x3c3d3e3f]);
});

describe('mode-cbc-test', () => {
  test('testEncryptor', () => {
    // Compute expected
    let expected = data.message.clone();
    let aes = C.algo.AES.createEncryptor(data.key);

    // First block XORed with IV, then encrypted
    for (let i = 0; i < 4; i++) {
      expected.words[i] ^= data.iv.words[i];
    }
    aes.encryptBlock(expected.words, 0);

    // Subsequent blocks XORed with previous crypted block, then encrypted
    for (let i = 4; i < 8; i++) {
      expected.words[i] ^= expected.words[i - 4];
    }
    aes.encryptBlock(expected.words, 4);

    // Compute actual
    let actual = C.AES.encrypt(data.message, data.key, {
      iv: data.iv,
      mode: C.mode.CBC,
      padding: C.pad.NoPadding
    }).ciphertext;
    expect(actual.toString()).toBe(expected.toString());
  });

  test('testDecryptor', () => {
    let encrypted = C.AES.encrypt(data.message, data.key, {
      iv: data.iv,
      mode: C.mode.CBC,
      padding: C.pad.NoPadding
    });
    let decrypted = C.AES.decrypt(encrypted, data.key, {
      iv: data.iv,
      mode: C.mode.CBC,
      padding: C.pad.NoPadding
    });
    expect(decrypted.toString()).toBe(data.message.toString());
  });
});