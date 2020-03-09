// const off = 0
const warn = 1
const error = 2

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'prettier/prettier': 'warn',
    'vue/max-attributes-per-line': [
      error,
      {
        singleline: error,
        multiline: {
          max: warn,
          allowFirstLine: true
        }
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
