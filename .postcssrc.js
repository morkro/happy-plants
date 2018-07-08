module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-cssnext': {
      features: {
        customProperties: false,
        calc: false,
        autoprefixer: false
      }
    },
    'postcss-reporter': {},
    // to edit target browsers: use 'browserslist' field in package.json
    autoprefixer: {},
    cssnano: {
      zindex: false
    }
  }
}
