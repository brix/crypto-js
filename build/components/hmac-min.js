/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var c=CryptoJS,j=c.enc.Utf8;c.algo.HMAC=c.lib.Base.extend({init:function(a,b){a=this._hasher=a.create();"string"==typeof b&&(b=j.parse(b));var c=a.blockSize,e=4*c;b.sigBytes>e&&(b=a.finalize(b));for(var f=this._oKey=b.clone(),g=this._iKey=b.clone(),h=f.words,i=g.words,d=0;d<c;d++)h[d]^=1549556828,i[d]^=909522486;f.sigBytes=g.sigBytes=e;this.reset()},reset:function(){var a=this._hasher;a.reset();a.update(this._iKey)},update:function(a){this._hasher.update(a);return this},finalize:function(a){var b=
this._hasher,a=b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a))}})})();
