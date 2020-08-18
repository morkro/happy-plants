const webpack = require('webpack')

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

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_VERSION: require('./package.json').version,
        },
      }),
    ],
  },

  chainWebpack: config => {
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end()
  },
}
