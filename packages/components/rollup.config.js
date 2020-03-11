import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  external: ['vue'],
  plugins: [typescript(), vue()],
}
