module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false,
    },
  },

  pwa: {
    name: 'HappyPlants',
    themeColor: '#ffffff',
    msTileColor: '#17c37b',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
  },
}
