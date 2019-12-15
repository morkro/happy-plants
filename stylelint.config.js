module.exports = {
  root: true,
  processors: [
    'stylelint-processor-html'
  ],
  extends: [
    'stylelint-config-standard'
  ],
  ignoreFiles: [
    '**/*.js',
    '*.js'
  ],
  rules: {
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'no-descending-specificity': null,
    'length-zero-no-unit': [true, {
      ignore: ['custom-properties']
    }]
  }
}
