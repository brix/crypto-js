import C from '../src/index';

describe('algo-hmac-sha384-test', () => {
  test('testVector1', () => {
    expect(C.HmacSHA384('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString()).toBe('7afaa633e20d379b02395915fbc385ff8dc27dcd3885e1068ab942eeab52ec1f20ad382a92370d8b2e0ac8b83c4d53bf');
  });
  test('testVector2', () => {
    expect(C.HmacSHA384('what do ya want for nothing?', 'Jefe').toString()).toBe('af45d2e376484031617f78d2b58a6b1b9c7ef464f5a01b47e42ec3736322445e8e2240ca5e69e2c78b3239ecfab21649');
  });
  test('testVector3', () => {
    expect(C.HmacSHA384(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString()).toBe('1383e82e28286b91f4cc7afbd13d5b5c6f887c05e7c4542484043a37a5fe45802a9470fb663bd7b6570fe2f503fc92f5');
  });
  test('testVector4', () => {
    expect(C.HmacSHA384('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A').toString()).toBe('365dfb271adb8e30fe6c74220b75df1b38c2d19b9d37f2e5a0ec2f3f22bd0406bf5b786e98d81b82c36d3d8a1be6cd07');
  });
  test('testVector5', () => {
    expect(C.HmacSHA384('abcdefghijklmnopqrstuvwxyz', 'A').toString()).toBe('a8357d5e84da64140e41545562ae0782e2a58e39c6cd98939fad8d9080e774c84b7eaca4ba07f6dbf0f12eab912c5285');
  });

  test('testUpdate', () => {
    let hmac = new C.algo.HMAC(C.algo.SHA384, C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(C.enc.Hex.parse('dddddddddddddddddddddddddddddddd'));
    expect(hmac.finalize().toString()).toBe(C.HmacSHA384(C.enc.Hex.parse('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'), C.enc.Hex.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toString());
  });

  test('testInputIntegrity', () => {
    let message = new C.lib.WordArray([0x12345678]);
    let key = new C.lib.WordArray([0x12345678]);

    let expectedMessage = message.toString();
    let expectedKey = key.toString();

    C.HmacSHA384(message, key);
    expect(message.toString()).toBe(expectedMessage);
    expect(key.toString()).toBe(expectedKey);
  });

  test('testRespectKeySigBytes', () => {
    let key = C.lib.WordArray.random(8);
    key.sigBytes = 4;

    let keyClamped = key.clone();
    keyClamped.clamp();
    expect(C.HmacSHA384('Message', key).toString()).toBe(C.HmacSHA384('Message', keyClamped).toString());
  });
});