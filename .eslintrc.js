const off = 0
const warn = 1
const error = 2

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/script-indent': [error, 2, { baseIndent: 1 }],
    'vue/html-indent': [error, 2, { baseIndent: 1 }],
    'vue/max-attributes-per-line': [error, {
      'singleline': error,
      'multiline': {
        'max': warn,
        'allowFirstLine': true
      }
    }],
    'vue/html-closing-bracket-newline': [error, {
      'singleline': 'never',
      'multiline': 'always'
    }],
    'indent': 'off',
    'arrow-parens': 'off',
    'generator-star-spacing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
