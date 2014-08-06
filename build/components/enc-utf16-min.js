/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var e=CryptoJS,f=e.lib.WordArray;e.enc.Utf16={stringify:function(b){for(var d=b.words,b=b.sigBytes,c=[],a=0;a<b;a+=2)c.push(String.fromCharCode(d[a>>>2]>>>16-8*(a%4)&65535));return c.join("")},parse:function(b){for(var d=b.length,c=[],a=0;a<d;a++)c[a>>>1]|=b.charCodeAt(a)<<16-16*(a%2);return f.create(c,2*d)}}})();
