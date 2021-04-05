import { Loader } from 'react-feather'
import styled from 'styled-components'
import { spin } from 'theme'

const Spinner = styled(Loader)`
  animation: ${spin} 3s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export default Spinner
