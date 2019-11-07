import C from '../src/index';

describe('algo-hmac-md5-test', () => {
  test('testVector1', () => {
    expect(C.HmacMD5('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString()).toBe('9294727a3638bb1c13f48ef8158bfc9d');
  });

  test('testVector2', () => {
    expect(C.HmacMD5('what do ya want for nothing?', 'Jefe').toString()).toBe('750c783e6ab0b503eaa86e310a5db738');
  });

  test('testVector3', () => {
    expect(C.HmacMD5(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString()).toBe('56be34521d144c88dbb8c733f0e8b3f6');
  });

  test('testVector4', () => {
    expect(C.HmacMD5('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString()).toBe('7ee2a3cc979ab19865704644ce13355c');
  });

  test('testVector5', () => {
    expect(C.HmacMD5('abcdefghijklmnopqrstuvwxyz', 'A').toString()).toBe('0e1bd89c43e3e6e3b3f8cf1d5ba4f77a');
  });

  test('testUpdate', () => {
    let hmac = new C.algo.HMAC(C.algo.MD5, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    expect(hmac.finalize().toString()).toBe(C.HmacMD5(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  test('testInputIntegrity', () => {
    let message = new C.lib.WordArray([0x12345678]);
    let key = new C.lib.WordArray([0x12345678]);

    let expectedMessage = message.toString();
    let expectedKey = key.toString();

    C.HmacMD5(message, key);
    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  test('testRespectKeySigBytes', () => {
    let key = C.lib.WordArray.random(8);
    key.sigBytes = 4;

    let keyClamped = key.clone();
    keyClamped.clamp();

    expect(C.HmacMD5('Message', key).toString()).toBe(C.HmacMD5('Message', keyClamped).toString());
  });
});