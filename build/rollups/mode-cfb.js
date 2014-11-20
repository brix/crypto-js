/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(m,g){var e={},k=e.lib={},n=function(){},h=k.Base={extend:function(a){n.prototype=this;var d=new n;a&&d.mixIn(a);d.hasOwnProperty("init")||(d.init=function(){d.$super.init.apply(this,arguments)});d.init.prototype=d;d.$super=this;return d},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var d in a)a.hasOwnProperty(d)&&(this[d]=a[d]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
l=k.WordArray=h.extend({init:function(a,d){a=this.words=a||[];this.sigBytes=d!=g?d:4*a.length},toString:function(a){return(a||r).stringify(this)},concat:function(a){var d=this.words,b=a.words,c=this.sigBytes;a=a.sigBytes;this.clamp();if(c%4)for(var f=0;f<a;f++)d[c+f>>>2]|=(b[f>>>2]>>>24-8*(f%4)&255)<<24-8*((c+f)%4);else for(f=0;f<a;f+=4)d[c+f>>>2]=b[f>>>2];this.sigBytes+=a;return this},clamp:function(){var a=this.words,d=this.sigBytes;a[d>>>2]&=4294967295<<32-8*(d%4);a.length=m.ceil(d/4)},clone:function(){var a=
h.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var d=[],b=function(b){var c=987654321;return function(){c=36969*(c&65535)+(c>>16)&4294967295;b=18E3*(b&65535)+(b>>16)&4294967295;var a=(c<<16)+b&4294967295,a=a/4294967296+0.5;return a*(0.5<m.random()?1:-1)}},c=0,f;c<a;c+=4){var j=b(4294967296*(f||m.random()));f=987654071*j();d.push(4294967296*j()|0)}return new l.init(d,a)}}),s=e.enc={},r=s.Hex={stringify:function(a){var d=a.words;a=a.sigBytes;for(var b=[],c=0;c<a;c++){var f=
d[c>>>2]>>>24-8*(c%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var d=a.length,b=[],c=0;c<d;c+=2)b[c>>>3]|=parseInt(a.substr(c,2),16)<<24-4*(c%8);return new l.init(b,d/2)}},q=s.Latin1={stringify:function(a){var d=a.words;a=a.sigBytes;for(var b=[],c=0;c<a;c++)b.push(String.fromCharCode(d[c>>>2]>>>24-8*(c%4)&255));return b.join("")},parse:function(a){for(var d=a.length,b=[],c=0;c<d;c++)b[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return new l.init(b,
d)}},u=s.Utf8={stringify:function(a){try{return decodeURIComponent(escape(q.stringify(a)))}catch(d){throw Error("Malformed UTF-8 data");}},parse:function(a){return q.parse(unescape(encodeURIComponent(a)))}},p=k.BufferedBlockAlgorithm=h.extend({reset:function(){this._data=new l.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=u.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var d=this._data,b=d.words,c=d.sigBytes,f=this.blockSize,j=c/(4*f),j=a?
m.ceil(j):m.max((j|0)-this._minBufferSize,0);a=j*f;c=m.min(4*a,c);if(a){for(var e=0;e<a;e+=f)this._doProcessBlock(b,e);e=b.splice(0,a);d.sigBytes-=c}return new l.init(e,c)},clone:function(){var a=h.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});k.Hasher=p.extend({cfg:h.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){p.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&
this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(d,b){return(new a.init(b)).finalize(d)}},_createHmacHelper:function(a){return function(d,b){return(new t.HMAC.init(a,b)).finalize(d)}}});var t=e.algo={};return e}(Math);
CryptoJS.lib.Cipher||function(m){var g=CryptoJS,e=g.lib,k=e.Base,n=e.WordArray,h=e.BufferedBlockAlgorithm,l=g.enc.Base64,s=g.algo.EvpKDF,r=e.Cipher=h.extend({cfg:k.extend(),createEncryptor:function(b,c){return this.create(this._ENC_XFORM_MODE,b,c)},createDecryptor:function(b,c){return this.create(this._DEC_XFORM_MODE,b,c)},init:function(b,c,a){this.cfg=this.cfg.extend(a);this._xformMode=b;this._key=c;this.reset()},reset:function(){h.reset.call(this);this._doReset()},process:function(b){this._append(b);
return this._process()},finalize:function(b){b&&this._append(b);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(b){return{encrypt:function(c,f,j){return("string"==typeof f?d:a).encrypt(b,c,f,j)},decrypt:function(c,f,j){return("string"==typeof f?d:a).decrypt(b,c,f,j)}}}});e.StreamCipher=r.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var q=g.mode={},u=function(b,c,a){var j=this._iv;j?this._iv=m:j=this._prevBlock;for(var d=
0;d<a;d++)b[c+d]^=j[d]},p=(e.BlockCipherMode=k.extend({createEncryptor:function(b,c){return this.Encryptor.create(b,c)},createDecryptor:function(b,c){return this.Decryptor.create(b,c)},init:function(b,c){this._cipher=b;this._iv=c}})).extend();p.Encryptor=p.extend({processBlock:function(b,c){var a=this._cipher,d=a.blockSize;u.call(this,b,c,d);a.encryptBlock(b,c);this._prevBlock=b.slice(c,c+d)}});p.Decryptor=p.extend({processBlock:function(b,c){var a=this._cipher,d=a.blockSize,e=b.slice(c,c+d);a.decryptBlock(b,
c);u.call(this,b,c,d);this._prevBlock=e}});q=q.CBC=p;p=(g.pad={}).Pkcs7={pad:function(b,c){for(var a=4*c,a=a-b.sigBytes%a,d=a<<24|a<<16|a<<8|a,e=[],h=0;h<a;h+=4)e.push(d);a=n.create(e,a);b.concat(a)},unpad:function(b){b.sigBytes-=b.words[b.sigBytes-1>>>2]&255}};e.BlockCipher=r.extend({cfg:r.cfg.extend({mode:q,padding:p}),reset:function(){r.reset.call(this);var b=this.cfg,a=b.iv,b=b.mode;if(this._xformMode==this._ENC_XFORM_MODE)var d=b.createEncryptor;else d=b.createDecryptor,this._minBufferSize=1;
this._mode=d.call(b,this,a&&a.words)},_doProcessBlock:function(b,a){this._mode.processBlock(b,a)},_doFinalize:function(){var b=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){b.pad(this._data,this.blockSize);var a=this._process(!0)}else a=this._process(!0),b.unpad(a);return a},blockSize:4});var t=e.CipherParams=k.extend({init:function(b){this.mixIn(b)},toString:function(b){return(b||this.formatter).stringify(this)}}),q=(g.format={}).OpenSSL={stringify:function(b){var a=b.ciphertext;b=b.salt;
return(b?n.create([1398893684,1701076831]).concat(b).concat(a):a).toString(l)},parse:function(a){a=l.parse(a);var c=a.words;if(1398893684==c[0]&&1701076831==c[1]){var d=n.create(c.slice(2,4));c.splice(0,4);a.sigBytes-=16}return t.create({ciphertext:a,salt:d})}},a=e.SerializableCipher=k.extend({cfg:k.extend({format:q}),encrypt:function(a,c,d,j){j=this.cfg.extend(j);var e=a.createEncryptor(d,j);c=e.finalize(c);e=e.cfg;return t.create({ciphertext:c,key:d,iv:e.iv,algorithm:a,mode:e.mode,padding:e.padding,
blockSize:a.blockSize,formatter:j.format})},decrypt:function(a,c,d,e){e=this.cfg.extend(e);c=this._parse(c,e.format);return a.createDecryptor(d,e).finalize(c.ciphertext)},_parse:function(a,c){return"string"==typeof a?c.parse(a,this):a}}),g=(g.kdf={}).OpenSSL={execute:function(a,c,d,e){e||(e=n.random(8));a=s.create({keySize:c+d}).compute(a,e);d=n.create(a.words.slice(c),4*d);a.sigBytes=4*c;return t.create({key:a,iv:d,salt:e})}},d=e.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:g}),encrypt:function(b,
c,d,e){e=this.cfg.extend(e);d=e.kdf.execute(d,b.keySize,b.ivSize);e.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,e);b.mixIn(d);return b},decrypt:function(b,c,d,e){e=this.cfg.extend(e);c=this._parse(c,e.format);d=e.kdf.execute(d,b.keySize,b.ivSize,c.salt);e.iv=d.iv;return a.decrypt.call(this,b,c,d.key,e)}})}();
CryptoJS.mode.CFB=function(){function m(e,k,g,h){var l=this._iv;l?(l=l.slice(0),this._iv=void 0):l=this._prevBlock;h.encryptBlock(l,0);for(h=0;h<g;h++)e[k+h]^=l[h]}var g=CryptoJS.lib.BlockCipherMode.extend();g.Encryptor=g.extend({processBlock:function(e,k){var g=this._cipher,h=g.blockSize;m.call(this,e,k,h,g);this._prevBlock=e.slice(k,k+h)}});g.Decryptor=g.extend({processBlock:function(e,g){var n=this._cipher,h=n.blockSize,l=e.slice(g,g+h);m.call(this,e,g,h,n);this._prevBlock=l}});return g}();
