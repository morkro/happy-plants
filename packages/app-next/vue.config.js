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
}
