# crypto-js

Modularized port of googlecode project crypto-js.

## Node.js (Install)

Requirements:

- Node.js
- npm (Node.js package manager)

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

Requirements:

- Node.js
- Bower (package manager for frontend)

```bash
bower install crypto-js
```

### Usage

Modular include:

```javascript
require.config({
    packages: [
        {
            name: 'crypto-js',
            location: 'path-to/bower_components/crypto-js/build/lib',
            main: 'crypto-js'
        }
    ]
});

require(["crypto-js/aes", "crypto-js/sha256"], function (AES, SHA256) {
    console.log(SHA256("Message"));
});
```

Including all libraries, for access to extra methods:

```javascript
// Above-mentioned will work or use this simple form
require.config({
    paths: {
        'require-js': 'path-to/bower_components/crypto-js/build/lib/crypto-js'
    }
});

require("crypto-js", function (CryptoJS) {
    console.log(CryptoJS.HmacSHA1("Message", "Key"));
});
```

You can also use `lib-uncompressed` instead of `lib`.

## API

See: https://code.google.com/p/crypto-js

## How to build

1. Clone

2. Run

    ```sh
    npm install
    ```

3. Run

    ```sh
    npm run build
    ```
    
4. Check `build/crypto-js` folder

## License

[The MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright (c) 2009-2013 Jeff Mott  
Copyright (c) 2013-2014 Evan Vosberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.