/*jshint node: true*/

module.exports = {
    build: {
        files: [{
            expand: false,
            cwd: '<%= meta.cwd %>',
            src: ['<%= meta.source %>'],
            dest: '<%= meta.build %>'
        }],
        options: {
            // all
            "index": {
                "global": "CryptoJS",
                "exports": "CryptoJS",
                "components": ["core", "x64-core", "lib-typedarrays", "enc-utf16", "enc-base64", "md5", "sha1", "sha256", "sha224", "sha512", "sha384", "sha3", "ripemd160", "hmac", "pbkdf2", "evpkdf", "cipher-core", "mode-cfb", "mode-ctr", "mode-ctr-gladman", "mode-ofb", "mode-ecb", "pad-ansix923", "pad-iso10126", "pad-iso97971", "pad-zeropadding", "pad-nopadding", "format-hex", "aes", "tripledes", "rc4", "rabbit", "rabbit-legacy"]
            },
            "crypto-js": {
                "pack": true,
                "global": "CryptoJS",
                "exports": "CryptoJS",
                "components": ["core", "x64-core", "lib-typedarrays", "enc-utf16", "enc-base64", "md5", "sha1", "sha256", "sha224", "sha512", "sha384", "sha3", "ripemd160", "hmac", "pbkdf2", "evpkdf", "cipher-core", "mode-cfb", "mode-ctr", "mode-ctr-gladman", "mode-ofb", "mode-ecb", "pad-ansix923", "pad-iso10126", "pad-iso97971", "pad-zeropadding", "pad-nopadding", "format-hex", "aes", "tripledes", "rc4", "rabbit", "rabbit-legacy"]
            },

            // hash
            "md5": {
                "exports": "CryptoJS.MD5",
                "components": ["core", "md5"]
            },
            "sha1": {
                "exports": "CryptoJS.SHA1",
                "components": ["core", "sha1"]
            },
            "sha256": {
                "exports": "CryptoJS.SHA256",
                "components": ["core", "sha256"]
            },
            "sha224": {
                "exports": "CryptoJS.SHA224",
                "components": ["core", "sha256", "sha224"]
            },
            "sha512": {
                "exports": "CryptoJS.SHA512",
                "components": ["core", "x64-core", "sha512"]
            },
            "sha384": {
                "exports": "CryptoJS.SHA384",
                "components": ["core", "x64-core", "sha512", "sha384"]
            },
            "sha3": {
                "exports": "CryptoJS.SHA3",
                "components": ["core", "x64-core", "sha3"]
            },
            "ripemd160": {
                "exports": "CryptoJS.RIPEMD160",
                "components": ["core", "ripemd160"]
            },

            // hmac hash
            "hmac-md5": {
                "exports": "CryptoJS.HmacMD5",
                "components": ["core", "md5", "hmac"]
            },
            "hmac-sha1": {
                "exports": "CryptoJS.HmacSHA1",
                "components": ["core", "sha1", "hmac"]
            },
            "hmac-sha256": {
                "exports": "CryptoJS.HmacSHA256",
                "components": ["core", "sha256", "hmac"]
            },
            "hmac-sha224": {
                "exports": "CryptoJS.HmacSHA224",
                "components": ["core", "sha256", "sha224", "hmac"]
            },
            "hmac-sha512": {
                "exports": "CryptoJS.HmacSHA512",
                "components": ["core", "x64-core", "sha512", "hmac"]
            },
            "hmac-sha384": {
                "exports": "CryptoJS.HmacSHA384",
                "components": ["core", "x64-core", "sha512", "sha384", "hmac"]
            },
            "hmac-sha3": {
                "exports": "CryptoJSHmacSHA3",
                "components": ["core", "x64-core", "sha3", "hmac"]
            },
            "hmac-ripemd160": {
                "exports": "CryptoJS.HmacRIPEMD160",
                "components": ["core", "ripemd160", "hmac"]
            },
            "pbkdf2": {
                "exports": "CryptoJS.PBKDF2",
                "components": ["core", "sha1", "hmac", "pbkdf2"]
            },
            "evpkdf": {
                "exports": "CryptoJS.EvpKDF",
                "components": ["core", "sha1", "hmac", "evpkdf"]
            },

            // cipher
            "aes": {
                "exports": "CryptoJS.AES",
                "components": ["core", "enc-base64", "md5", "evpkdf", "cipher-core", "aes"]
            },
            "tripledes": {
                "exports": "CryptoJS.TripleDES",
                "components": ["core", "enc-base64", "md5", "evpkdf", "cipher-core", "tripledes"]
            },
            "rc4": {
                "exports": "CryptoJS.RC4",
                "components": ["core", "enc-base64", "md5", "evpkdf", "cipher-core", "rc4"]
            },
            "rabbit": {
                "exports": "CryptoJS.Rabbit",
                "components": ["core", "enc-base64", "md5", "evpkdf", "cipher-core", "rabbit"]
            },
            "rabbit-legacy": {
                "exports": "CryptoJS.RabbitLegacy",
                "components": ["core", "enc-base64", "md5", "evpkdf", "cipher-core", "rabbit-legacy"]
            },

            // core
            "core": {
                "exports": "CryptoJS",
                "components": ["core"],
                "global": "CryptoJS" 
            },
            "x64-core": {
                "exports": "CryptoJS",
                "components": ["core", "x64-core"]
            },
            "hmac": {
                "components": ["core", "hmac"]
            },
            "cipher-core": {
                "components": ["core", "cipher-core"]
            },

            // lib
            "lib-typedarrays": {
                "exports": "CryptoJS.lib.WordArray",
                "components": ["core", "lib-typedarrays"]
            },

            // format
            "format-openssl": {
                "exports": "CryptoJS.format.OpenSSL",
                "components": ["core", "cipher-core"]
            },
            "format-hex": {
                "exports": "CryptoJS.format.Hex",
                "components": ["core", "cipher-core", "format-hex"]
            },

            // enc
            "enc-latin1": {
                "exports": "CryptoJS.enc.Latin1",
                "components": ["core"]
            },
            "enc-utf8": {
                "exports": "CryptoJS.enc.Utf8",
                "components": ["core"]
            },
            "enc-hex": {
                "exports": "CryptoJS.enc.Hex",
                "components": ["core"]
            },
            "enc-utf16": {
                "exports": "CryptoJS.enc.Utf16",
                "components": ["core", "enc-utf16"]
            },
            "enc-base64": {
                "exports": "CryptoJS.enc.Base64",
                "components": ["core", "enc-base64"]
            },

            // mode
            "mode-cfb": {
                "exports": "CryptoJS.mode.CFB",
                "components": ["core", "cipher-core", "mode-cfb"]
            },
            "mode-ctr": {
                "exports": "CryptoJS.mode.CTR",
                "components": ["core", "cipher-core", "mode-ctr"]
            },
            "mode-ctr-gladman": {
                "exports": "CryptoJS.mode.CTRGladman",
                "components": ["core", "cipher-core", "mode-ctr-gladman"]
            },
            "mode-ofb": {
                "exports": "CryptoJS.mode.OFB",
                "components": ["core", "cipher-core", "mode-ofb"]
            },
            "mode-ecb": {
                "exports": "CryptoJS.mode.ECB",
                "components": ["core", "cipher-core", "mode-ecb"]
            },

            // pad
            "pad-pkcs7": {
                "exports": "CryptoJS.pad.Pkcs7",
                "components": ["core", "cipher-core", "pad-pkcs7"]
            },
            "pad-ansix923": {
                "exports": "CryptoJS.pad.Ansix923",
                "components": ["core", "cipher-core", "pad-ansix923"]
            },
            "pad-iso10126": {
                "exports": "CryptoJS.pad.Iso10126",
                "components": ["core", "cipher-core", "pad-iso10126"]
            },
            "pad-iso97971": {
                "exports": "CryptoJS.pad.Iso97971",
                "components": ["core", "cipher-core", "pad-iso97971"]
            },
            "pad-zeropadding": {
                "exports": "CryptoJS.pad.ZeroPadding",
                "components": ["core", "cipher-core", "pad-zeropadding"]
            },
            "pad-nopadding": {
                "exports": "CryptoJS.pad.NoPadding",
                "components": ["core", "cipher-core", "pad-nopadding"]
            }
        }
    }
};
