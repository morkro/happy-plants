module.exports = {
  plugins: ['stylelint-use-nesting', 'stylelint-group-selectors', 'stylelint-a11y'],
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended',
    'stylelint-a11y/recommended',
  ],
}
