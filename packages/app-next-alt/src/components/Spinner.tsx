import { Loader } from 'react-feather'
import styled from 'styled-components'
import { spin } from 'theme'

const Spinner = styled(Loader)`
  animation: ${spin} 3s linear infinite;
`

export default Spinner
