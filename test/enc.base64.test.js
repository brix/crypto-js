import C from '../src/index';

const STRINGFY_TEST_CONFIG = [
  [0, 0, ''],
  [1, 1, 'Zg=='],
  [2, 2, 'Zm8='],
  [3, 3, 'Zm9v'],
  [4, 4, 'Zm9vYg=='],
  [5, 5, 'Zm9vYmE='],
  [6, 6, 'Zm9vYmFy']
];

const PARSE_TEST_CONFIG = [
  [0, '', 0],
  [1, 'Zg==', 1],
  [2, 'Zm8=', 2],
  [3, 'Zm9v', 3],
  [4, 'Zm9vYg==', 4],
  [5, 'Zm9vYmE=', 5],
  [6, 'Zm9vYmFy', 6]
];

describe('enc-base64-test', () => {
  test.each(STRINGFY_TEST_CONFIG)(
    'testStringfy%i',
    (a, b, expected) => {
      expect(C.enc.Base64.stringify(new C.lib.WordArray([0x666f6f62, 0x61720000], b))).toBe(expected);
    }
  );

  test('testStringify15', () => {
    expect(C.enc.Base64.stringify(new C.lib.WordArray([0x3e3e3e3f, 0x3f3f3e3e, 0x3e3f3f3f, 0x3d2f2b00], 15))).toBe('Pj4+Pz8/Pj4+Pz8/PS8r');
  });

  test.each(PARSE_TEST_CONFIG)(
    'testParse%i',
    (a, b, expected) => {
      expect(C.enc.Base64.parse(b).toString()).toBe(new C.lib.WordArray([0x666f6f62, 0x61720000], expected).toString());
    }
  );

  test('testParse15', () => {
    expect(C.enc.Base64.parse('Pj4+Pz8/Pj4+Pz8/PS8r').toString()).toBe(new C.lib.WordArray([0x3e3e3e3f, 0x3f3f3e3e, 0x3e3f3f3f, 0x3d2f2b00], 15).toString());
  });
});