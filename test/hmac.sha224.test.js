import C from '../src/index';

describe('algo-hmac-sha224-test', () => {
  test('testVector1', () => {
    expect(C.HmacSHA224('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString()).toBe('4e841ce7a4ae83fbcf71e3cd64bfbf277f73a14680aae8c518ac7861');
  });

  test('testVector2', () => {
    expect(C.HmacSHA224('what do ya want for nothing?', 'Jefe').toString()).toBe('a30e01098bc6dbbf45690f3a7e9e6d0f8bbea2a39e6148008fd05e44');
  });

  test('testVector3', () => {
    expect(C.HmacSHA224(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString()).toBe('cbff7c2716bbaa7c77bed4f491d3e8456cb6c574e92f672b291acf5b');
  });

  test('testVector4', () => {
    expect(C.HmacSHA224('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString()).toBe('61bf669da4fdcd8e5c3bd09ebbb4a986d3d1b298d3ca05c511f7aeff');
  });

  test('testVector5', () => {
    expect(C.HmacSHA224('abcdefghijklmnopqrstuvwxyz', 'A').toString()).toBe('16fc69ada3c3edc1fe9144d6b98d93393833ae442bedf681110a1176');
  });

  test('testUpdate', () => {
    let hmac = new C.algo.HMAC(C.algo.SHA224, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    expect(hmac.finalize().toString()).toBe(C.HmacSHA224(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  test('testInputIntegrity', () => {
    let message = new C.lib.WordArray([0x12345678]);
    let key = new C.lib.WordArray([0x12345678]);

    let expectedMessage = message.toString();
    let expectedKey = key.toString();

    C.HmacSHA224(message, key);

    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  test('testRespectKeySigBytes', () => {
    let key = C.lib.WordArray.random(8);
    key.sigBytes = 4;

    let keyClamped = key.clone();
    keyClamped.clamp();

    expect(C.HmacSHA224('Message', key).toString()).toBe(C.HmacSHA224('Message', keyClamped).toString());
  });
});