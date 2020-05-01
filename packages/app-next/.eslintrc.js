// const off = 0
const warn = 1
const error = 2

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  ignorePatterns: ['vue.config.js'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/script-indent': 'off',
    'vue/html-indent': [
      error,
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
      },
    ],
    'vue/max-attributes-per-line': [
      error,
      {
        singleline: 20,
        multiline: {
          max: warn,
          allowFirstLine: false,
        },
      },
    ],
    indent: 'off',
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
