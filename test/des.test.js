import C from '../src/index';

const ENCRYPT_TEST_CONFIG = [
  [1, '0000000000000000', '8000000000000000', '95a8d72813daa94d'],
  [2, '0000000000000000', '0000000000002000', '1de5279dae3bed6f'],
  [3, '0000000000002000', '0000000000000000', '1d1ca853ae7c0c5f'],
  [4, '3232323232323232', '3232323232323232', 'ac978c247863388f'],
  [5, '6464646464646464', '6464646464646464', '3af1703d76442789'],
  [6, '9696969696969696', '9696969696969696', 'a020003c5554f34c']
];

const DECRYPT_TEST_CONFIG = [
  [1, '95a8d72813daa94d', '8000000000000000', '0000000000000000'],
  [2, '1de5279dae3bed6f', '0000000000002000', '0000000000000000'],
  [3, '1d1ca853ae7c0c5f', '0000000000000000', '0000000000002000'],
  [4, 'ac978c247863388f', '3232323232323232', '3232323232323232'],
  [5, '3af1703d76442789', '6464646464646464', '6464646464646464'],
  [6, 'a020003c5554f34c', '9696969696969696', '9696969696969696']
];

describe('algo-des-test', () => {
  test.each(ENCRYPT_TEST_CONFIG)(
    'testEncrypt%i',
    (a, b, c, expected) => {
      expect(C.DES.encrypt(C.enc.Hex.parse(b), C.enc.Hex.parse(c), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).ciphertext.toString()).toBe(expected);
    }
  );

  test.each(DECRYPT_TEST_CONFIG)(
    'testDercrypt%i',
    (a, b, c, expected) => {
      expect(C.DES.decrypt(new C.lib.CipherParams({
        ciphertext: C.enc.Hex.parse(b)
      }), C.enc.Hex.parse(c), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString()).toBe(expected);
    }
  );

  test('testMultiPart', () => {
    let des = C.algo.DES.createEncryptor(C.enc.Hex.parse('0123456789abcdef'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    });
    let ciphertext1 = des.process(C.enc.Hex.parse('001122334455'));
    let ciphertext2 = des.process(C.enc.Hex.parse('66778899aa'));
    let ciphertext3 = des.process(C.enc.Hex.parse('bbccddeeff'));
    let ciphertext4 = des.finalize();
    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()).toBe(C.DES.encrypt(C.enc.Hex.parse('00112233445566778899aabbccddeeff'), C.enc.Hex.parse('0123456789abcdef'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString());
  });

  test('testInputIntegrity', () => {
    let message = C.enc.Hex.parse('00112233445566778899aabbccddeeff');
    let key = C.enc.Hex.parse('0001020304050607');
    let iv = C.enc.Hex.parse('08090a0b0c0d0e0f');

    let expectedMessage = message.toString();
    let expectedKey = key.toString();
    let expectedIv = iv.toString();

    C.DES.encrypt(message, key, {
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
    expect(C.DES.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString()).toBe(C.algo.DES.createEncryptor(C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).finalize('Hi There').toString());
    expect(C.DES.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString()).toBe(C.lib.SerializableCipher.encrypt(C.algo.DES, 'Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString());
    expect(C.DES.encrypt('Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString()).toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.DES, 'Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString());
    // Restore random method
    C.lib.WordArray.random = random;
  });
});