import postcss from 'rollup-plugin-postcss'
import presetEnv from 'postcss-preset-env'
import reporter from 'postcss-reporter'

const postcssConfig = () => postcss({
  extract: true,
  plugins: [
    presetEnv({
      stage: 0,
      features: {
        'nesting-rules': true,
        'color-mod-function': { unresolved: 'warn' },
      },
    }),
    reporter(),
  ],
})

const cssConfig = fileName => ({
  input: `src/${fileName}`,
  output: {
    file: `dist/${fileName}`,
  },
  plugins: [postcssConfig()],
})

export default [
  cssConfig('colors.css'),
  cssConfig('colors-next.css'),
  cssConfig('fonts.css'),
]
