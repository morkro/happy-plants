// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-cssnext": {
      features: {
        calc: false,
        customProperties: false,
        autoprefixer: false
      }
    },
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
