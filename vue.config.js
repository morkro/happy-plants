const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: config => {
    config.resolve.alias['#'] = resolve('')
  },

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false
    }
  }
}
