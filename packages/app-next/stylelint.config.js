module.exports = {
  root: true,
  processors: ['stylelint-processor-html'],
  extends: ['stylelint-config-standard'],
  rules: {
    'no-empty-source': null,
    'declaration-empty-line-before': null,
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
