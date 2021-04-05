import styled, { css } from 'styled-components'

export const VisuallyHiddenStyles = css`
  &:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
`

const VisuallyHidden = styled.span`
  ${VisuallyHiddenStyles}
`

export default VisuallyHidden
