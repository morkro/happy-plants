module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        calc: { preserve: true },
        'nesting-rules': true,
        'color-mod': true
      }
    },
    'postcss-reporter': {},
    // to edit target browsers: use 'browserslist' field in package.json
    autoprefixer: {},
    // cssnano causes calc() to behave inconsistent. Committing out  for further investigation.
    // cssnano: {
    //   preset: ['default', {
    //     calc: false,
    //     zindex: false
    //   }]
    // }
  }
}
