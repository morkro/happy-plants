const path = require('path')

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false,
    },
  },

  devServer: {
    proxy: 'http://localhost:3000',
  },

  pwa: {
    name: 'HappyPlants',
    themeColor: '#ffffff',
    msTileColor: '#17c37b',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
  },

  configureWebpack: config => {
    config.resolve.alias['#'] = path.resolve(__dirname, '')
  },

  chainWebpack: config => {
    // prettier-ignore
    config.module
      .rule('web-worker')
        .test(/\.worker\.js$/)
        .use('worker-loader')
          .loader('worker-loader')
          .end()
      .end()
      .rule('markdown')
        .test(/\.md$/)
        .use('vue-loader')
          .loader('vue-loader')
          .options({
            compilerOptions: {
              preserveWhiteSpace: false
            }
          })
          .end()
        .use('vmark-loader')
          .loader('vmark-loader')
          .end()
  },
}
