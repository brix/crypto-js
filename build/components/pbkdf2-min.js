/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var b=CryptoJS,a=b.lib,d=a.Base,l=a.WordArray,a=b.algo,o=a.HMAC,k=a.PBKDF2=d.extend({cfg:d.extend({keySize:4,hasher:a.SHA1,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){for(var c=this.cfg,f=o.create(c.hasher,a),g=l.create(),d=l.create([1]),k=g.words,p=d.words,m=c.keySize,c=c.iterations;k.length<m;){var h=f.update(b).finalize(d);f.reset();for(var i=h.words,q=i.length,j=h,n=1;n<c;n++){j=f.finalize(j);f.reset();for(var r=j.words,e=0;e<q;e++)i[e]^=r[e]}g.concat(h);
p[0]++}g.sigBytes=4*m;return g}});b.PBKDF2=function(a,b,c){return k.create(c).compute(a,b)}})();
