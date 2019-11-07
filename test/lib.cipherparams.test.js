import C from '../src/index';

const data = {};
beforeAll(() => {
  data.ciphertext = C.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
  data.key = C.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
  data.iv = C.enc.Hex.parse('202122232425262728292a2b2c2d2e2f');
  data.salt = C.enc.Hex.parse('0123456789abcdef');
  data.algorithm = C.algo.AES;
  data.mode = C.mode.CBC;
  data.padding = C.pad.PKCS7;
  data.blockSize = data.algorithm.blockSize;
  data.formatter = C.format.OpenSSL;
  data.cipherParams = new C.lib.CipherParams({
    ciphertext: data.ciphertext,
    key: data.key,
    iv: data.iv,
    salt: data.salt,
    algorithm: data.algorithm,
    mode: data.mode,
    padding: data.padding,
    blockSize: data.blockSize,
    formatter: data.formatter
  });
});

describe('lib-cipherparams-test', () => {
  test('testInit', () => {
    expect(data.cipherParams.ciphertext).toBe(data.ciphertext);
    expect(data.cipherParams.key).toBe(data.key);
    expect(data.cipherParams.iv).toBe(data.iv);
    expect(data.cipherParams.salt).toBe(data.salt);
    expect(data.cipherParams.algorithm).toBe(data.algorithm);
    expect(data.cipherParams.mode).toBe(data.mode);
    expect(data.cipherParams.padding).toBe(data.padding);
    expect(data.cipherParams.blockSize).toBe(data.blockSize);
    expect(data.cipherParams.formatter).toBe(data.formatter);
  });

  test('testToString0', () => {
    expect(data.cipherParams.toString()).toBe(C.format.OpenSSL.stringify(data.cipherParams));
  });

  test('testToString1', () => {
    const JsonFormatter = {
      stringify: function (cipherParams) {
        return '{ ct: ' + cipherParams.ciphertext + ', iv: ' + cipherParams.iv + ' }';
      }
    };
    expect(data.cipherParams.toString(JsonFormatter)).toBe(JsonFormatter.stringify(data.cipherParams));
  });
});