import C from '../src/index';

const data = {};
beforeAll(() => {
  data.ciphertext = new C.lib.WordArray([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
  data.salt = new C.lib.WordArray([0x01234567, 0x89abcdef]);
});

describe('format-openssl-test', () => {
  test('testSaltedToString', () => {
    expect(C.format.OpenSSL.stringify(new C.lib.CipherParams({
      ciphertext: data.ciphertext,
      salt: data.salt
    }))).toBe(C.enc.Latin1.parse('Salted__').concat(data.salt).concat(data.ciphertext).toString(C.enc.Base64));
  });

  test('testUnsaltedToString', () => {
    expect(C.format.OpenSSL.stringify(new C.lib.CipherParams({
      ciphertext: data.ciphertext
    }))).toBe(data.ciphertext.toString(C.enc.Base64));
  });

  test('testSaltedFromString', () => {
    let openSSLStr = C.format.OpenSSL.stringify(new C.lib.CipherParams({
      ciphertext: data.ciphertext,
      salt: data.salt
    }));
    let cipherParams = C.format.OpenSSL.parse(openSSLStr);
    expect(cipherParams.ciphertext.toString()).toBe(data.ciphertext.toString());
    expect(cipherParams.salt.toString()).toBe(data.salt.toString());
  });

  test('testUnsaltedFromString', () => {
    let openSSLStr = C.format.OpenSSL.stringify(new C.lib.CipherParams({
      ciphertext: data.ciphertext
    }));
    let cipherParams = C.format.OpenSSL.parse(openSSLStr);
    expect(cipherParams.ciphertext.toString()).toBe(data.ciphertext.toString());
  });
});