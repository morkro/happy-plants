import 'styled-components'
import { CustomTheme } from '../theme'

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
