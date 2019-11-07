import C from '../src/index';

describe('enc-hex-test', () => {
  test('testStringify', () => {
    expect(C.enc.Hex.stringify(new C.lib.WordArray([0x12345678]))).toBe('12345678');
  });

  test('testParse', () => {
    expect(C.enc.Hex.parse('12345678').toString()).toBe(new C.lib.WordArray([0x12345678]).toString());
  });
});