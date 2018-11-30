const CryptoJS = require('../build');

function hex_to_ascii(str1) {
  var hex = str1.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

describe('algo-seed-test', function () {
  const C = CryptoJS;
  const key = CryptoJS.enc.Base64.parse('​​​​​TIzNDU2Nzg5MDEyMzQ1Ng==');
  
  test('encrypt', () => {
    const encrypted = C.lib.SerializableCipher.encrypt(CryptoJS.algo.SEED,
      C.enc.Utf8.parse('hanjukim'),
      key, {
        iv: C.enc.Utf8.parse('AaBbCcDd')
      });
      
    expect(encrypted.toString()).toBe('0GsHpgZdniL74zEMyRVM6Q==');
  });

  test('decrypt', () => {
    const decrypted = C.lib.SerializableCipher.decrypt(CryptoJS.algo.SEED,
      '0GsHpgZdniL74zEMyRVM6Q==',
      key, {
        iv: C.enc.Utf8.parse('AaBbCcDd')
      });

    expect(hex_to_ascii(decrypted.toString())).toBe('hanjukim');
  });
});
