# crypto-js

Modularized port of googlecode project crypto-js.

## Node.js (Install)

Requirements:
* Node.js
* npm (Node.js package manager)

```bash
npm install crypto-js
```

### USE

```javascript
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
```

## Client (browser)

### USE

```javascript
require(["crypto-js/aes", "crypto-js/sha256"], function (AES, SHA256) {

});
```

## API

See: https://code.google.com/p/crypto-js