// eslint-disable-next-line no-undef
module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es2021": true,
    "commonjs": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    'no-unused-vars': 1,
    'react/prop-types': 'off',
    'indent': ['error', 2, {'SwitchCase': 1}],
  }
}
