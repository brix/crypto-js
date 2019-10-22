import C from '../src/index';

describe('algo-rabbit-legacy-test', () => {
  test('testVector1', () => {
    expect(C.RabbitLegacy.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000')).ciphertext.toString())
      .toBe('02f74a1c26456bf5ecd6a536f05457b1');
  });

  test('testVector2', () => {
    expect(C.RabbitLegacy.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('dc51c3ac3bfc62f12e3d36fe91281329')).ciphertext.toString())
      .toBe('9c51e28784c37fe9a127f63ec8f32d3d');
  });

  test('testVector3', () => {
    expect(C.RabbitLegacy.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('c09b0043e9e9ab0187e0c73383957415')).ciphertext.toString())
      .toBe('9b60d002fd5ceb32accd41a0cd0db10c');
  });

  test('testVector4', () => {
    expect(C.RabbitLegacy.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000'), {
      iv: C.enc.Hex.parse('0000000000000000')
    }).ciphertext.toString())
      .toBe('edb70567375dcd7cd89554f85e27a7c6');
  });

  test('testVector5', () => {
    expect(C.RabbitLegacy.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000'), {
      iv: C.enc.Hex.parse('597e26c175f573c3')
    }).ciphertext.toString())
      .toBe('6d7d012292ccdce0e2120058b94ecd1f');
  });

  test('testVector6', () => {
    expect(C.RabbitLegacy.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000'), {
      iv: C.enc.Hex.parse('2717f4d21a56eba6')
    }).ciphertext.toString())
      .toBe('4d1051a123afb670bf8d8505c8d85a44');
  });

  test('testMultiPart', () => {
    const rabbit = C.algo.RabbitLegacy.createEncryptor(C.enc.Hex.parse('00000000000000000000000000000000'));
    const ciphertext1 = rabbit.process(C.enc.Hex.parse('000000000000'));
    const ciphertext2 = rabbit.process(C.enc.Hex.parse('0000000000'));
    const ciphertext3 = rabbit.process(C.enc.Hex.parse('0000000000'));
    const ciphertext4 = rabbit.finalize();

    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString())
      .toBe('02f74a1c26456bf5ecd6a536f05457b1');
  });

  test('testInputIntegrity', () => {
    const message = C.enc.Hex.parse('00000000000000000000000000000000');
    const key = C.enc.Hex.parse('00000000000000000000000000000000');
    const iv = C.enc.Hex.parse('0000000000000000');

    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();

    C.RabbitLegacy.encrypt(message, key, {
      iv
    });

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
    expect(iv.toString()).toBe(expectedIv);
  });

  test('testHelper', () => {
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

    expect(C.RabbitLegacy.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString())
      .toBe(C.algo.RabbitLegacy.createEncryptor(C.SHA256('Jefe'), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).finalize('Hi There').toString());

    expect(C.RabbitLegacy.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString())
      .toBe(C.lib.SerializableCipher.encrypt(C.algo.RabbitLegacy, 'Hi There', C.SHA256('Jefe'), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString());

    expect(C.RabbitLegacy.encrypt('Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString())
      .toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.RabbitLegacy, 'Hi There', 'Jefe', {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString());

    // Restore random method
    C.lib.WordArray.random = random;
  });
});