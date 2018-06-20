module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
          "modules": true
        }
      },
    "extends": "eslint:recommended",
    "rules": {
        "no-useless-escape": 0,
        "no-irregular-whitespace": 0,
        "semi": [
            "error",
            "always"
        ]
    }
};