YUI.add('algo-seed-test', function (Y) {
  var C = CryptoJS;
  var key = CryptoJS.enc.Base64.parse('​​​​​TIzNDU2Nzg5MDEyMzQ1Ng==');
  
  Y.Test.Runner.add(new Y.Test.Case({
    name: 'SEED',
    encryptTest: function() {
      var encrypted = C.lib.SerializableCipher.encrypt(CryptoJS.algo.SEED,
        C.enc.Utf8.parse('hanjukim'),
        key, {
          iv: C.enc.Utf8.parse('AaBbCcDd')
        });
        
      Y.Assert.areEqual(encrypted.toString(), 'bYF1c8T64mjz9334CPJtQw==');
    },
    decryptTest: function() {
      var decrypted = C.lib.SerializableCipher.encrypt(CryptoJS.algo.SEED,
        'bYF1c8T64mjz9334CPJtQw==',
        key, {
          iv: C.enc.Utf8.parse('AaBbCcDd')
        });
        
      Y.Assert.areEqual(decrypted.toString(), '4d657373616765');
    }
  }));
});
