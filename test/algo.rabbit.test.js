import C from '../src/index';

describe('algo-rabbit-test', () => {
  test('testVector1', () => {
    expect(C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('00000000000000000000000000000000')).ciphertext.toString())
      .toBe('02f74a1c26456bf5ecd6a536f05457b1');
  });

  test('testVector2', () => {
    expect(C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('c21fcf3881cd5ee8628accb0a9890df8')).ciphertext.toString())
      .toBe('3d02e0c730559112b473b790dee018df');
  });

  test('testVector3', () => {
    expect(C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('1d272c6a2d8e3dfcac14056b78d633a0')).ciphertext.toString())
      .toBe('a3a97abb80393820b7e50c4abb53823d');
  });

  test('testVector4', () => {
    expect(C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('0053a6f94c9ff24598eb3e91e4378add'), {
      iv: C.enc.Hex.parse('0d74db42a91077de')
    }).ciphertext.toString())
      .toBe('75d186d6bc6905c64f1b2dfdd51f7bfc');
  });

  test('testVector5', () => {
    expect(C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('0558abfe51a4f74a9df04396e93c8fe2'), {
      iv: C.enc.Hex.parse('167de44bb21980e7')
    }).ciphertext.toString())
      .toBe('476e2750c73856c93563b5f546f56a6a');
  });

  test('testVector6', () => {
    expect(C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('0a5db00356a9fc4fa2f5489bee4194e7'), {
      iv: C.enc.Hex.parse('1f86ed54bb2289f0')
    }).ciphertext.toString())
      .toBe('921fcf4983891365a7dc901924b5e24b');
  });

  test('testVector7', () => {
    expect(C.Rabbit.encrypt(C.enc.Hex.parse('00000000000000000000000000000000'), C.enc.Hex.parse('0f62b5085bae0154a7fa4da0f34699ec'), {
      iv: C.enc.Hex.parse('288ff65dc42b92f9')
    }).ciphertext.toString())
      .toBe('613cb0ba96aff6cacf2a459a102a7f78');
  });

  test('testMultiPart', () => {
    const rabbit = C.algo.Rabbit.createEncryptor(C.enc.Hex.parse('00000000000000000000000000000000'));
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

    C.Rabbit.encrypt(message, key, {
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

    expect(C.Rabbit.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).ciphertext.toString())
      .toBe(C.algo.Rabbit.createEncryptor(C.SHA256('Jefe'), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).finalize('Hi There').toString());
    expect(C.Rabbit.encrypt('Hi There', C.SHA256('Jefe'), {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString())
      .toBe(C.lib.SerializableCipher.encrypt(C.algo.Rabbit, 'Hi There', C.SHA256('Jefe'), {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString());
    expect(C.Rabbit.encrypt('Hi There', 'Jefe', {
      mode: C.mode.ECB,
      padding: C.pad.NoPadding
    }).toString())
      .toBe(C.lib.PasswordBasedCipher.encrypt(C.algo.Rabbit, 'Hi There', 'Jefe', {
        mode: C.mode.ECB,
        padding: C.pad.NoPadding
      }).toString());

    // Restore random method
    C.lib.WordArray.random = random;
  });
});