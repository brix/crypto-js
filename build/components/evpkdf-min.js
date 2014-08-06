/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var b=CryptoJS,a=b.lib,f=a.Base,j=a.WordArray,a=b.algo,k=a.EvpKDF=f.extend({cfg:f.extend({keySize:4,hasher:a.MD5,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){for(var c=this.cfg,d=c.hasher.create(),g=j.create(),f=g.words,h=c.keySize,c=c.iterations;f.length<h;){e&&d.update(e);var e=d.update(a).finalize(b);d.reset();for(var i=1;i<c;i++)e=d.finalize(e),d.reset();g.concat(e)}g.sigBytes=4*h;return g}});b.EvpKDF=function(a,b,c){return k.create(c).compute(a,
b)}})();
