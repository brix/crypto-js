import C from '../src/index';

const STRINGFY_TEST_CONFIG = [
  [1, 1, 0x24000000, '$'],
  [2, 2, 0xc2a20000, '¢'],
  [3, 3, 0xe282ac00, '€'],
  [4, 4, 0xf0a4ada2, '𤭢']
];

const PARSE_TEST_CONFIG = [
  [1, '$', 0x24000000, 1],
  [2, '¢', 0xc2a20000, 2],
  [3, '€', 0xe282ac00, 3],
  [4, '𤭢', 0xf0a4ada2, 4]
];

describe('enc-utf8-tes', () => {
  test.each(STRINGFY_TEST_CONFIG)(
    'testStringfy%i',
    (a, b, c, expected) => {
      expect(C.enc.Utf8.stringify(new C.lib.WordArray([c], b))).toBe(expected);
    }
  );

  test.each(PARSE_TEST_CONFIG)(
    'testParse%i',
    (a, b, c, expected) => {
      expect(C.enc.Utf8.parse(b).toString()).toBe(new C.lib.WordArray([c], expected).toString());
    }
  );
});