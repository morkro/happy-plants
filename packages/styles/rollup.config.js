import postcss from 'rollup-plugin-postcss'
import presetEnv from 'postcss-preset-env'
import reporter from 'postcss-reporter'

export default {
  input: 'src/colors.css',
  output: {
    file: 'dist/colors.css',
  },
  plugins: [
    postcss({
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
    }),
  ],
}
