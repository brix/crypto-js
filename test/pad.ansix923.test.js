import C from '../src/index';

describe('pad-ansix923-test', () => {
  test('testPad', () => {
    let data = new C.lib.WordArray([0xdddddd00], 3);
    C.pad.AnsiX923.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00, 0x00000005]).toString());
  });

  test('testPadClamp', () => {
    let data = new C.lib.WordArray([0xdddddddd, 0xdddddddd], 3);
    C.pad.AnsiX923.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00, 0x00000005]).toString());
  });

  test('testUnpad', () => {
    let data = new C.lib.WordArray([0xdddddd00, 0x00000005]);
    C.pad.AnsiX923.unpad(data);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00], 3).toString());
  });
});