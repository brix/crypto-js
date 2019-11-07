import C from '../src/index';

const VECTOR_CONFIG_TEST = [
  [1, '', '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b'],
  [2, 'The quick brown fox jumps over the lazy dog', 'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1'],
  [3, 'The quick brown fox jumps over the lazy dog.', 'ed892481d8272ca6df370bf706e4d7bc1b5739fa2177aae6c50e946678718fc67a7af2819a021c2fc34e91bdb63409d7']
];

describe('algo-sha384-test', () => {
  test.each(VECTOR_CONFIG_TEST)(
    'testVector%i',
    (a, b, expected) => {
      expect(C.SHA384(b).toString()).toBe(expected);
    }
  );

  test('testUpdateAndLongMessage', () => {
    const sha384 = new C.algo.SHA384();
    for (let i = 0; i < 100; i++) {
      sha384.update('12345678901234567890123456789012345678901234567890');
    }

    expect(sha384.finalize().toString())
      .toBe('297a519246d6f639a4020119e1f03fc8d77171647b2ff75ea4125b7150fed0cdcc93f8dca1c3c6a624d5e88d780d82cd');
  });

  test('testClone', () => {
    const sha384 = new C.algo.SHA384();

    expect(sha384.update('a').clone().finalize().toString()).toBe(C.SHA384('a').toString());
    expect(sha384.update('b').clone().finalize().toString()).toBe(C.SHA384('ab').toString());
    expect(sha384.update('c').clone().finalize().toString()).toBe(C.SHA384('abc').toString());
  });

  test('testInputIntegrity', () => {
    const message = new C.lib.WordArray([0x12345678]);

    const expected = message.toString();

    C.SHA384(message);

    expect(message.toString()).toBe(expected);
  });

  test('testHelper', () => {
    expect(C.SHA384('').toString()).toBe(new C.algo.SHA384().finalize('').toString());
  });

  test('testHmacHelper', () => {
    expect(C.HmacSHA384('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString())
      .toBe(new C.algo.HMAC(C.algo.SHA384, C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).finalize('Hi There').toString());
  });
});