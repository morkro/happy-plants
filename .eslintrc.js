module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
    'arrow-parens': 'off',
    'generator-star-spacing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
