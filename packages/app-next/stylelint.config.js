module.exports = {
  root: true,
  processors: ['stylelint-processor-html'],
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/*.js', '**/*.ts'],
  rules: {
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'custom-property-empty-line-before': null,
    'rule-empty-line-before': null,
    'no-descending-specificity': null,
    'function-calc-no-invalid': null,
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],
  },
}
