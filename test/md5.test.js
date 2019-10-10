import C from '../lib/index.js';

const VECTOR_TEST_CONFIG = [
  [1, '', 'd41d8cd98f00b204e9800998ecf8427e'],
  [2, 'a', '0cc175b9c0f1b6a831c399e269772661'],
  [3, 'abc', '900150983cd24fb0d6963f7d28e17f72'],
  [4, 'message digest', 'f96b697d7cb7938d525a2f31aaf161d0'],
  [5, 'abcdefghijklmnopqrstuvwxyz', 'c3fcd3d76192e4007dfb496cca67e13b'],
  [6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 'd174ab98d277d9f5a5611c2c9f419d9f'],
  [7, '12345678901234567890123456789012345678901234567890123456789012345678901234567890', '57edf4a22be3c955ac49da2e2107b67a']
];

const CLONE_TEST_CONFIG = [
  ['a', 'a'],
  ['b', 'ab'],
  ['c', 'abc']
];

describe('algo-md5-test', () => {
  describe.each(VECTOR_TEST_CONFIG)(
    'testVector%i',
    (a, b, expected) => {
      test(`return ${expected}`, () => {
        expect(C.MD5(b).toString()).toBe(expected);
      });
    }
  );

  describe('testClone', () => {
    const md5 = C.algo.MD5.create();
    test.each(CLONE_TEST_CONFIG)(
      'return %s, %s',
      (a, expected) => {
        expect(md5.update(a).clone().finalize().toString()).toBe(C.MD5(expected).toString());
      }
    );
  });

  test('testUpdateAndLongMessage', () => {
    let i = 0;
    const md5 = C.algo.MD5.create();
    while (i < 100) {
      md5.update('12345678901234567890123456789012345678901234567890');
      i++;
    }
    expect(md5.finalize().toString()).toBe('7d017545e0268a6a12f2b507871d0429');
  });

  test('testInputIntegrity', () => {
    const message = C.lib.WordArray.create([0x12345678]);
    const expected = message.toString();
    C.MD5(message);
    expect(message.toString()).toBe(expected);
  });

  test('testHelper', () => {
    expect(C.MD5('').toString()).toBe(C.algo.MD5.create().finalize('').toString());
  });

  test('testHmacHelper', () => {
    expect(C.HmacMD5('Hi There', C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).toString()).toBe(C.algo.HMAC.create(C.algo.MD5, C.enc.Hex.parse('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')).finalize('Hi There').toString());
  });
});