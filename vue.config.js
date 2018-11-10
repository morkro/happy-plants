const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  },

  configureWebpack: config => {
    config.resolve.alias['#'] = resolve('')
  },

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false
    }
  },

  pwa: {
    name: 'HappyPlants'
  }
}
