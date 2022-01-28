module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['prettier', 'react', 'react-hooks', 'filenames', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/boolean-prop-naming': [
      'error',
      {
        rule: '^(is|has|show|hide|should|can)[A-Z]([A-Za-z0-9]?)+',
      },
    ],
    'react/button-has-type': 'off',
    'no-debugger': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '{assets,components,data,pages,routes,services,typings,utilities}/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
}
