const off = 0
const warn = 1
const error = 2

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020
  },
  extends: [
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'prettier/prettier': 'off',
    'vue/script-indent': [error, 2, { baseIndent: 1 }],
    'vue/html-indent': [error, 2, { baseIndent: 1 }],
    'vue/max-attributes-per-line': [
      error,
      {
        singleline: error,
        multiline: {
          max: warn,
          allowFirstLine: true
        }
      }
    ],
    'vue/html-closing-bracket-newline': [
      error,
      {
        singleline: 'never',
        multiline: 'always'
      }
    ]
  }
}
