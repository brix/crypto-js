import C from '../src/index';

describe('pad-pkcs7-test', () => {
  test('testPad', () => {
    let data = new C.lib.WordArray([0xdddddd00], 3);
    C.pad.Pkcs7.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd05, 0x05050505]).toString());
  });

  test('testPadClamp', () => {
    const data = new C.lib.WordArray([0xdddddddd, 0xdddddddd], 3);
    C.pad.Pkcs7.pad(data, 2);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd05, 0x05050505]).toString());
  });

  test('testUnpad', () => {
    let data = new C.lib.WordArray([0xdddddd05, 0x05050505]);
    C.pad.Pkcs7.unpad(data);
    expect(data.toString()).toBe(new C.lib.WordArray([0xdddddd00], 3).toString());
  });
});