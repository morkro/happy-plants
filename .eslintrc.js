// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'vue/script-indent': 'off',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': [2, {
      'singleline': 2,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }],
    'indent': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
