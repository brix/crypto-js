import C from '../src/index';

const ENCRYPT_TEST_CONFIG = [
  [1, '0000000000000000', '800101010101010180010101010101018001010101010101', '95a8d72813daa94d'],
  [1, '0000000000000000', '010101010101010201010101010101020101010101010102', '869efd7f9f265a09'],
  [1, '8000000000000000', '010101010101010101010101010101010101010101010101', '95f8a5e5dd31d900'],
  [1, '0000000000000001', '010101010101010101010101010101010101010101010101', '166b40b44aba4bd6']
];

const DECRYPT_TEST_CONFIG = [
  [1, '95a8d72813daa94d', '800101010101010180010101010101018001010101010101', '0000000000000000'],
  [1, '869efd7f9f265a09', '010101010101010201010101010101020101010101010102', '0000000000000000'],
  [1, '95f8a5e5dd31d900', '010101010101010101010101010101010101010101010101', '8000000000000000'],
  [1, '166b40b44aba4bd6', '010101010101010101010101010101010101010101010101', '0000000000000001']
];

describe('algo-tripledes-test', () => {
  test.each(ENCRYPT_TEST_CONFIG)(
    'testEncrypt%i',
    (a, b, c, expected) => {
      expect(C.TripleDES.encrypt(C.enc.Hex.parse(b), C.enc.Hex.parse(c), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).ciphertext.toString()).toBe(expected);
    }
  );

  test.each(DECRYPT_TEST_CONFIG)(
    'testDecrypt%i',
    (a, b, c, expected) => {
      expect(C.TripleDES.decrypt(new C.lib.CipherParams({
        ciphertext: C.enc.Hex.parse(b)
      }), C.enc.Hex.parse(c), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString()).toBe(expected);
    }
  );

  test('testMultiPart', () => {
    let des = C.algo.TripleDES.createEncryptor(C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    });
    let ciphertext1 = des.process(C.enc.Hex.parse('001122334455'));
    let ciphertext2 = des.process(C.enc.Hex.parse('66778899aa'));
    let ciphertext3 = des.process(C.enc.Hex.parse('bbccddeeff'));
    let ciphertext4 = des.finalize();
    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()).toBe(C.TripleDES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString());
  });

  test('testInputIntegrity', () => {
    let message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    let key = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    let iv = C.enc.Hex.parse('08090a0b0c0d0e0f');

    let expectedMessage = message.toString();
    let expectedKey = key.toString();
    let expectedIv = iv.toString();

    C.TripleDES.encrypt(message, key, {
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

    expect(C.TripleDES.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString()).toBe(C.algo.TripleDES.createEncryptor(C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).finalize('Hi There').toString());
    expect(C.TripleDES.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString()).toBe(C.lib.SerializableCipher.encrypt(C.algo.TripleDES, 'Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString());
    expect(C.TripleDES.encrypt('Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString()).toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.TripleDES, 'Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString());
    // Restore random method
    C.lib.WordArray.random = random;
  });
});