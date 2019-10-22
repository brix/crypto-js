import C from '../src/index';

describe('algo-hmac-sha512-test', () => {
  test('testVector1', () => {
    expect(C.HmacSHA512('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString()).toBe('7641c48a3b4aa8f887c07b3e83f96affb89c978fed8c96fcbbf4ad596eebfe496f9f16da6cd080ba393c6f365ad72b50d15c71bfb1d6b81f66a911786c6ce932');
  });
  test('testVector2', () => {
    expect(C.HmacSHA512('what do ya want for nothing?', 'Jefe').toString()).toBe('164b7a7bfcf819e2e395fbe73b56e0a387bd64222e831fd610270cd7ea2505549758bf75c05a994a6d034f65f8f0e6fdcaeab1a34d4a6b4b636e070a38bce737');
  });
  test('testVector3', () => {
    expect(C.HmacSHA512(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString()).toBe('ad9b5c7de72693737cd5e9d9f41170d18841fec1201c1c1b02e05cae116718009f771cad9946ddbf7e3cde3e818d9ae85d91b2badae94172d096a44a79c91e86');
  });
  test('testVector4', () => {
    expect(C.HmacSHA512('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString()).toBe('a303979f7c94bb39a8ab6ce05cdbe28f0255da8bb305263e3478ef7e855f0242729bf1d2be55398f14da8e63f0302465a8a3f76c297bd584ad028d18ed7f0195');
  });
  test('testVector5', () => {
    expect(C.HmacSHA512('abcdefghijklmnopqrstuvwxyz', 'A').toString()).toBe('8c2d56f7628325e62124c0a870ad98d101327fc42696899a06ce0d7121454022fae597e42c25ac3a4c380fd514f553702a5b0afaa9b5a22050902f024368e9d9');
  });

  test('testUpdate', () => {
    let hmac = new C.algo.HMAC(C.algo.SHA512, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    expect(hmac.finalize().toString()).toBe(C.HmacSHA512(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  test('testInputIntegrity', () => {
    let message = new C.lib.WordArray([0x12345678]);
    let key = new C.lib.WordArray([0x12345678]);

    let expectedMessage = message.toString();
    let expectedKey = key.toString();

    C.HmacSHA512(message, key);
    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  test('testRespectKeySigBytes', () => {
    let key = C.lib.WordArray.random(8);
    key.sigBytes = 4;

    let keyClamped = key.clone();
    keyClamped.clamp();
    expect(C.HmacSHA512('Message', key).toString()).toBe(C.HmacSHA512('Message', keyClamped).toString());
  })
});