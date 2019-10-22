import C from '../src/index';

describe('x64-word-test', () => {
  test('testInit', () => {
    let word = new C.x64.Word(0x00010203, 0x04050607);
    expect(word.high).toBe(0x00010203);
    expect(word.low).toBe(0x04050607);
  });
});