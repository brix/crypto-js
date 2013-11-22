# crypto-js

Modularized port of googlecode project crypto-js.

## Node.js (Install)

Requirements:
* Node.js
* npm (Node.js package manager)

```bash
npm install crypto-js
```

### Usage

Modular include:
```javascript
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
...
console.log(SHA256("Message"));
```

Including all libraries, for access to extra methods:
```javascript
var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));
```

## Client (browser)

### Usage

Modular include:
```javascript
require(["crypto-js/aes", "crypto-js/sha256"], function (AES, SHA256) {
    console.log(SHA256("Message"));
});
```

Including all libraries, for access to extra methods:
```javascript
require("crypto-js", function (CryptoJS) {
    console.log(CryptoJS.HmacSHA1("Message", "Key"));
});
```

## API

See: https://code.google.com/p/crypto-js
