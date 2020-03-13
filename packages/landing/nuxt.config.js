import StyleLintPlugin from 'stylelint-webpack-plugin'

export default {
  mode: 'universal',

  head: {
    title: 'HappyPlants',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' }
    ],
    script: [
      { src: '//cdn.headwayapp.co/widget.js', defer: true }
    ]
  },

  loading: { color: '#fff' },

  css: [
    { src: '@happy-plants/styles/dist/colors.css', lang: 'postcss' },
    { src: '@happy-plants/components/dist/index.css', lang: 'postcss' },
    { src: '@/assets/variables.css', lang: 'postcss' },
    { src: '@/assets/fonts.css', lang: 'postcss' },
    { src: '@/assets/pattern.css', lang: 'postcss' }
  ],

  plugins: [
    '~/plugins/global-components',
    '~/plugins/lazy-load-directive'
  ],

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics'
  ],

  env: {
    HEADWAY_ACCOUNT: process.env.HEADWAY_ACCOUNT
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS,
    dev: false
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.plugins.push(
        StyleLintPlugin({
          files: '**/*.vue'
        })
      )
    },

    postcss: {
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
      }
    }
  }
}
