module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-preset-env': {
      stage: 0,
      features: {
        calc: { preserve: true },
        'nesting-rules': true,
        'color-mod': true,
        'custom-media': true
      }
    },
    'postcss-reporter': {},
    'postcss-color-mod-function': {},
    // to edit target browsers: use 'browserslist' field in package.json
    autoprefixer: {}
  }
}
