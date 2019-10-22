import C from '../src/index';

const data = {};
beforeAll(() => {
  data.buffer = new ArrayBuffer(8);

  let uint8View = new Uint8Array(data.buffer);
  uint8View[0] = 0x01;
  uint8View[1] = 0x23;
  uint8View[2] = 0x45;
  uint8View[3] = 0x67;
  uint8View[4] = 0x89;
  uint8View[5] = 0xab;
  uint8View[6] = 0xcd;
  uint8View[7] = 0xef;
});

describe('lib-wordarray-test', () => {
  test('testInt8Array', () => {
    expect(new C.lib.WordArray(new Int8Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  test('testUint8Array', () => {
    expect(new C.lib.WordArray(new Uint8Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  test('testUint8ClampedArray', () => {
    expect(new C.lib.WordArray(new Uint8ClampedArray(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  test('testInt16Array', () => {
    expect(new C.lib.WordArray(new Int16Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  test('testUint16Array', () => {
    expect(new C.lib.WordArray(new Uint16Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  test('testInt32Array', () => {
    expect(new C.lib.WordArray(new Int32Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  test('testUint32Array', () => {
    expect(new C.lib.WordArray(new Uint32Array(data.buffer)).toString()).toBe('0123456789abcdef');
  });

  test('testPartialView', () => {
    expect(new C.lib.WordArray(new Int16Array(data.buffer, 2, 2)).toString()).toBe('456789ab');
  });
});