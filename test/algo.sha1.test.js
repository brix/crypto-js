import C from '../src/index';

const VECTOR_CONFIG_TEST = [
  [1, '', 'da39a3ee5e6b4b0d3255bfef95601890afd80709'],
  [2, 'a', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8'],
  [3, 'abc', 'a9993e364706816aba3e25717850c26c9cd0d89d'],
  [4, 'message digest', 'c12252ceda8be8994d5fa0290a47231c1d16aae3'],
  [5, 'abcdefghijklmnopqrstuvwxyz', '32d10c7b8cf96570ca04ce37f2a19d84240d3a89'],
  [6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '761c457bf73b14d27e9e9265c46f4b4dda11f940'],
  [7, '12345678901234567890123456789012345678901234567890123456789012345678901234567890', '50abf5706a150990a08b2c5ea40fa0e585554732']
];

describe('algo-sha1-test', () => {
  test.each(VECTOR_CONFIG_TEST)(
    'testVector%i',
    (a, b, expected) => {
      expect(C.SHA1(b).toString()).toBe(expected);
    }
  );

  test('testUpdateAndLongMessage', () => {
    const sha1 = new C.algo.SHA1();
    for (let i = 0; i < 100; i++) {
      sha1.update('12345678901234567890123456789012345678901234567890');
    }

    expect(sha1.finalize().toString()).toBe('85e4c4b3933d5553ebf82090409a9d90226d845c');
  });

  test('testClone', () => {
    const sha1 = new C.algo.SHA1();

    expect(sha1.update('a').clone().finalize().toString()).toBe(C.SHA1('a').toString());
    expect(sha1.update('b').clone().finalize().toString()).toBe(C.SHA1('ab').toString());
    expect(sha1.update('c').clone().finalize().toString()).toBe(C.SHA1('abc').toString());
  });

  test('testInputIntegrity', () => {
    const message = new C.lib.WordArray([0x12345678]);

    const expected = message.toString();

    C.SHA1(message);

    expect(message.toString()).toBe(expected);
  });

  test('testHelper', () => {
    expect(C.SHA1('').toString()).toBe(new C.algo.SHA1().finalize('').toString());
  });

  test('testHmacHelper', () => {
    expect(C.HmacSHA1('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe(new C.algo.HMAC(C.algo.SHA1, C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).finalize('Hi There').toString());
  });
});