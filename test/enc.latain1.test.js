import C from '../src/index';

describe('enc-latin1-test', () => {
  test('testStringify', () => {
    expect( C.enc.Latin1.stringify(new C.lib.WordArray([0x12345678]))).toBe('\x12\x34\x56\x78');
  });

  test('testParse', () => {
    expect(C.enc.Latin1.parse('\x12\x34\x56\x78').toString()).toBe(new C.lib.WordArray([0x12345678]).toString());
  });
});