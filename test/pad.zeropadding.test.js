import C from '../src/index';

describe('pad-zeropadding-test', () => {
  test('testPad', () => {
    let data = new C.lib.WordArray([0xdddddd00], 3);
    C.pad.ZeroPadding.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00, 0x00000000]).toString());
  });

  test('testPadClamp', () => {
    let data = new C.lib.WordArray([0xdddddddd, 0xdddddddd], 3);
    C.pad.ZeroPadding.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00, 0x00000000]).toString());
  });

  test('testUnpad', () => {
    let data = new C.lib.WordArray([0xdddddd00, 0x00000000]);
    C.pad.ZeroPadding.unpad(data);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00], 3).toString());
  });
});