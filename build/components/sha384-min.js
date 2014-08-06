/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var c=CryptoJS,a=c.x64,b=a.Word,e=a.WordArray,a=c.algo,d=a.SHA512,a=a.SHA384=d.extend({_doReset:function(){this._hash=e.create([b.create(3418070365,3238371032),b.create(1654270250,914150663),b.create(2438529370,812702999),b.create(355462360,4144912697),b.create(1731405415,4290775857),b.create(2394180231,1750603025),b.create(3675008525,1694076839),b.create(1203062813,3204075428)])},_doFinalize:function(){d._doFinalize.call(this);this._hash.sigBytes-=16}});c.SHA384=d._createHelper(a);c.HmacSHA384=
d._createHmacHelper(a)})();
