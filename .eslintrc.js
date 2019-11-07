module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true
        }
    },
    "rules": {
        "quotes": ['warn', "single"],
        "linebreak-style": [0, "error", "windows"],
        "indent": ["error", 2],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],
        "no-console": "off",
        "accessor-pairs": "error",
        "default-case":"error",
        "no-eval": "error",
        "no-use-before-define": "warn",
        "max-len": "off",
        "comma-dangle": ["error", "never"]
    }
};