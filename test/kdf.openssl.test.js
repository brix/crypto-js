import C from '../src/index';

describe('kdf-openssl-test', () => {
  test('testVector', () => {
    let derivedParams = C.kdf.OpenSSL.execute('password', 256 / 32, 128 / 32, C.enc.Hex.parse('0a9d8620cf7219f1'));
    expect(derivedParams.key.toString()).toBe('50f32e0ec9408e02ff42364a52aac95c3694fc027256c6f488bf84b8e60effcd');
    expect(derivedParams.iv.toString()).toBe('81381e39b94fd692dff7e2239a298cb6');
    expect(derivedParams.salt.toString()).toBe('0a9d8620cf7219f1');
  });
});