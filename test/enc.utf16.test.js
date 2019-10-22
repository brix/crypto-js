import C from '../src/index';

const STRINGFY_TEST_CONFIG = [
  [1, 0x007a0000, 2, 'z'],
  [2, 0x6c340000, 2, '水'],
  [3, 0xd800dc00, 4, '𐀀'],
  [4, 0xd834dd1e, 4, '𝄞'],
  [5, 0xdbffdffd, 4, '􏿽']
];

const PARSE_TEST_CONFIG = [
  [1, 'z', 0x007a0000, 2],
  [2, '水', 0x6c340000, 2],
  [3, '𐀀', 0xd800dc00, 4],
  [4, '𝄞', 0xd834dd1e, 4],
  [5, '􏿽', 0xdbffdffd, 4]
];

describe('enc-utf16-test', () => {
  test.each(STRINGFY_TEST_CONFIG)(
    'testString%i',
    (a, b, c, expected) => {
      expect(C.enc.Utf16.stringify(new C.lib.WordArray([b], c))).toBe(expected);
    }
  );

  test('testStringifyLE', () => {
    expect(C.enc.Utf16LE.stringify(new C.lib.WordArray([0xffdbfddf], 4))).toBe('􏿽');
  });

  test.each(PARSE_TEST_CONFIG)(
    'testParse%i',
    (a, expected, b, c) => {
      expect(C.enc.Utf16.parse(expected).toString()).toBe(new C.lib.WordArray([b], c).toString());
    }
  );

  test('testParseLE', () => {
    expect(C.enc.Utf16LE.parse('􏿽').toString()).toBe(new C.lib.WordArray([0xffdbfddf], 4).toString());
  });
});
