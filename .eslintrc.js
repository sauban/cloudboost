module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "plugins": ["mocha"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "modules": true
        }
      },
    "extends": "eslint:recommended",
    "rules": {
        "semi": [
            "error",
            "always"
        ]
    }
};