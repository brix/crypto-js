import C from '../src/index';

describe('pad-iso97971-test', () => {
  test('testPad1', () => {
    let data = new C.lib.WordArray([0xdddddd00], 3);
    C.pad.Iso97971.pad(data, 1);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd80]).toString());
  });

  test('testPad2', () => {
    let data = new C.lib.WordArray([0xdddddd00], 3);
    C.pad.Iso97971.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd80, 0x00000000]).toString());
  });

  test('testPadClamp', () => {
    let data = new C.lib.WordArray([0xdddddddd, 0xdddddddd], 3);
    C.pad.Iso97971.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd80, 0x00000000]).toString());
  });

  test('testUnpad', () => {
    let data = new C.lib.WordArray([0xdddddd80, 0x00000000]);
    C.pad.Iso97971.unpad(data);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00], 3).toString());
  });
});