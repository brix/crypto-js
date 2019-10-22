import C from '../src/index';

const _data = {};
beforeAll(() => {
  // Save original random method
  _data.random = C.lib.WordArray.random;

  // Replace random method with one that returns a predictable value
  C.lib.WordArray.random = function (nBytes) {
    let words = [];
    for (let i = 0; i < nBytes; i += 4) {
      words.push([0x11223344]);
    }

    return new C.lib.WordArray(words, nBytes);
  };
});

afterAll(() => {
  // Restore random method
  C.lib.WordArray.random = _data.random;
});

describe('pad-iso10126-test', () => {
  test('testPad', () => {
    let data = new C.lib.WordArray([0xdddddd00], 3);
    C.pad.Iso10126.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd11, 0x22334405]).toString());
  });

  test('testPadClamp', () => {
    let data = new C.lib.WordArray([0xdddddddd, 0xdddddddd], 3);
    C.pad.Iso10126.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd11, 0x22334405]).toString());
  });

  test('testUnpad', () => {
    let data = new C.lib.WordArray([0xdddddd11, 0x22334405]);
    C.pad.Iso10126.unpad(data);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00], 3).toString());
  });
});