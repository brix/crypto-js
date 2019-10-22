import C from '../src/index';

describe('x64-wordarray-test', () => {
  test('testInit0', () => {
    expect(new C.x64.WordArray().toX32().toString()).toBe('');
  });

  test('testInit1', () => {
    let wordArray = new C.x64.WordArray([
      new C.x64.Word(0x00010203, 0x04050607),
      new C.x64.Word(0x18191a1b, 0x1c1d1e1f)
    ]);
    expect(wordArray.toX32().toString()).toBe('000102030405060718191a1b1c1d1e1f');
  });

  test('testInit2', () => {
    let wordArray = new C.x64.WordArray([
      new C.x64.Word(0x00010203, 0x04050607),
      new C.x64.Word(0x18191a1b, 0x1c1d1e1f)
    ], 10);

    expect(wordArray.toX32().toString()).toBe('00010203040506071819');
  });
});