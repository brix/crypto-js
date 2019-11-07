import C from '../src/index.js';


const ENCRYPT_KEY_SIZE = [
  [128, '00112233445566778899aabbccddeeff', '000102030405060708090a0b0c0d0e0f', '69c4e0d86a7b0430d8cdb78070b4c55a'],
  [192, '00112233445566778899aabbccddeeff', '000102030405060708090a0b0c0d0e0f1011121314151617', 'dda97ca4864cdfe06eaf70a0ec0d7191'],
  [256, '00112233445566778899aabbccddeeff', '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f', '8ea2b7ca516745bfeafc49904b496089']
];

const DECRYPT_KEY_SIZE = [
  [128, '69c4e0d86a7b0430d8cdb78070b4c55a', '000102030405060708090a0b0c0d0e0f', '00112233445566778899aabbccddeeff'],
  [192, 'dda97ca4864cdfe06eaf70a0ec0d7191', '000102030405060708090a0b0c0d0e0f1011121314151617', '00112233445566778899aabbccddeeff'],
  [256, '8ea2b7ca516745bfeafc49904b496089', '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f', '00112233445566778899aabbccddeeff']
];

describe('algo-aes-test', () => {
  test.each(ENCRYPT_KEY_SIZE)(
    'testEncryptKeySize%i',
    (a, b, c, expected) => {
      expect(C.AES.encrypt(C.enc.Hex.parse(b), C.enc.Hex.parse(c), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).ciphertext.toString()).toBe(expected);
    }
  );

  test.each(DECRYPT_KEY_SIZE)(
    'testDecryptKeySize%i',
    (a, b, c, expected) => {
      expect(C.AES.decrypt(new C.lib.CipherParams({
        ciphertext: C.enc.Hex.parse(b)
      }), C.enc.Hex.parse(c), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString()).toBe(expected);
    }
  );

  test('testMultiPart', () => {
    let aes = C.algo.AES.createEncryptor(C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    });
    let ciphertext1 = aes.process(C.enc.Hex.parse('001122334455'));
    let ciphertext2 = aes.process(C.enc.Hex.parse('66778899aa'));
    let ciphertext3 = aes.process(C.enc.Hex.parse('bbccddeeff'));
    let ciphertext4 = aes.finalize();
    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()).toBe('69c4e0d86a7b0430d8cdb78070b4c55a');
  });

  test('testInputIntegrity', () => {
    let message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    let key = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
    let iv = C.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
    let expectedMessage = message.toString();
    let expectedKey = key.toString();
    let expectedIv = iv.toString();
    C.AES.encrypt(message, key, {
      iv: iv
    });
    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
    expect(iv.toString()).toBe(expectedIv);
  });

  test('testHelper', () => {
    // Save original random method
    let random = C.lib.WordArray.random;
    // Replace random method with one that returns a predictable value
    C.lib.WordArray.random = function (nBytes) {
      let words = [];
      for (let i = 0; i < nBytes; i += 4) {
        words.push([0x11223344]);
      }
      return new C.lib.WordArray(words, nBytes);
    };
    expect(C.AES.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString()).toBe(C.algo.AES.createEncryptor(C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).finalize('Hi There').toString());
    expect(C.AES.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString()).toBe(C.lib.SerializableCipher.encrypt(C.algo.AES, 'Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString());
    expect(C.AES.encrypt('Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString()).toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.AES, 'Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString());
    // Restore random method
    C.lib.WordArray.random = random;
  });
});