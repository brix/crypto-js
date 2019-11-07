import C from '../src/index';

describe('lib-wordarray-test', () => {
  test('testInit0', () => {
    expect(new C.lib.WordArray().toString()).toBe('');
  });

  test('testInit1', () => {
    expect(new C.lib.WordArray([0x12345678]).toString()).toBe('12345678');
  });

  test('testInit2', () => {
    expect(new C.lib.WordArray([0x12345678], 2).toString()).toBe('1234');
  });

  test('testToStringPassedEncoder', () => {
    expect(new C.lib.WordArray([0x12345678]).toString(C.enc.Latin1)).toBe('\x12\x34\x56\x78');
  });

  test('testToStringDefaultEncoder', () => {
    expect(new C.lib.WordArray([0x12345678]).toString()).toBe('12345678');
  });

  test('testConcat3', () => {
    let wordArray1 = new C.lib.WordArray([0x12345678], 3);
    let wordArray2 = new C.lib.WordArray([0x12345678], 3);
    expect(wordArray1.concat(wordArray2).toString()).toBe('123456123456');
    expect(wordArray1.toString()).toBe('123456123456');
  });

  test('testConcat4', () => {
    let wordArray1 = new C.lib.WordArray([0x12345678], 4);
    let wordArray2 = new C.lib.WordArray([0x12345678], 3);
    expect(wordArray1.concat(wordArray2).toString()).toBe('12345678123456');
    expect(wordArray1.toString()).toBe('12345678123456');
  });

  test('testConcat5', () => {
    let wordArray1 = new C.lib.WordArray([0x12345678], 5);
    let wordArray2 = new C.lib.WordArray([0x12345678], 3);
    expect(wordArray1.concat(wordArray2).toString()).toBe('1234567800123456');
    expect(wordArray1.toString()).toBe('1234567800123456');
  });

  test('testConcatLong', () => {
    let wordArray1 = new C.lib.WordArray();
    let wordArray2 = new C.lib.WordArray();
    let wordArray3 = new C.lib.WordArray();
    for (let i = 0; i < 500000; i++) {
      wordArray2.words[i] = i;
      wordArray3.words[i] = i;
    }
    wordArray2.sigBytes = 500000;
    wordArray3.sigBytes = 500000;
    const expected = wordArray2.toString() + wordArray3.toString();
    expect(wordArray1.concat(wordArray2.concat(wordArray3)).toString()).toBe(expected);
  });

  test('testClamp', () => {
    let wordArray = new C.lib.WordArray([0x12345678, 0x12345678], 3);
    wordArray.clamp();
    expect(wordArray.words.toString()).toBe([0x12345600].toString());
  });

  test('testClone', () => {
    let wordArray = new C.lib.WordArray([0x12345678]);
    let clone = wordArray.clone();
    clone.words[0] = 0;
    expect(clone.toString()).not.toBe(wordArray.toString());
  });

  test('testRandom', () => {
    expect(C.lib.WordArray.random(8).toString()).not.toBe(C.lib.WordArray.random(8).toString());
    expect(C.lib.WordArray.random(8).sigBytes).toBe(8);
  });
});