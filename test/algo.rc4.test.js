import C from '../src/index';

describe('rc4', () => {
  test('testVector1', () => {
    expect(C.RC4.encrypt(C.enc.Hex.parse('0000000000000000'), C.enc.Hex.parse('0123456789abcdef')).ciphertext.toString())
      .toBe('7494c2e7104b0879');
  });

  test('testVector2', () => {
    expect(C.RC4.encrypt(C.enc.Hex.parse('dcee4cf92c'), C.enc.Hex.parse('618a63d2fb')).ciphertext.toString())
      .toBe('f13829c9de');
  });

  test('drop', () => {
    expect(C.RC4Drop.encrypt(C.enc.Hex.parse('0000000000000000'), C.enc.Hex.parse('0123456789abcdef'), {
      drop: 2
    }).ciphertext.toString())
      .toBe(C.RC4.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('0123456789abcdef')).ciphertext.toString().substr(16));
  });

  test('multi part', () => {
    const rabbit = C.algo.RC4.createEncryptor(C.enc.Hex.parse('0123456789abcdef'));
    const ciphertext1 = rabbit.process(C.enc.Hex.parse('00000000'));
    const ciphertext2 = rabbit.process(C.enc.Hex.parse('0000'));
    const ciphertext3 = rabbit.process(C.enc.Hex.parse('0000'));
    const ciphertext4 = rabbit.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe('7494c2e7104b0879');
  });

  test('input integrity', () => {
    const message = C.enc.Hex.parse('0000000000000000');
    const key = C.enc.Hex.parse('0123456789abcdef');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();

    C.RC4.encrypt(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  test('test helper', () => {
    // Save original random method
    const {
      random
    } = C.lib.WordArray;

    // Replace random method with one that returns a predictable value
    C.lib.WordArray.random = (nBytes) => {
      const words = [];
      for (let i = 0; i < nBytes; i += 4) {
        words.push([0x11223344]);
      }

      return new C.lib.WordArray(words, nBytes);
    };

    expect(C.RC4.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString())
      .toBe(C.algo.RC4.createEncryptor(C.SHA256('Jefe'), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).finalize('Hi There').toString());
    expect(C.RC4.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString())
      .toBe(C.lib.SerializableCipher.encrypt(C.algo.RC4, 'Hi There', C.SHA256('Jefe'), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString());
    expect(C.RC4.encrypt('Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString())
      .toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.RC4, 'Hi There', 'Jefe', {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString());

    // Restore random method
    C.lib.WordArray.random = random;
  });
});