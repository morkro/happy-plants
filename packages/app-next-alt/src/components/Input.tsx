import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Text } from 'components/Typography'
import { WithMarginProps, WithMarginStyles } from 'utilities/withProps'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  fullWidth?: boolean
}

type InputProps = WithMarginProps<BaseInputProps>

const InputContainer = styled.div<InputProps>`
  ${WithMarginStyles}
  position: relative;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

const BaseInput = styled.input<InputProps>`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.baseRadius};
  font-family: var(--font-special);
  font-size: ${({ theme }) => theme.fonts.base};
  padding: calc(${({ theme }) => theme.spacings.m} * 2);
  border: 2px solid ${({ theme, error }) => (error ? theme.colors.red : theme.colors.white)};
  color: var(--brand-green-dark);
  transition: box-shadow var(--base-transition) ease-in-out;

  &[type='radio'],
  &[type='checkbox'] {
    width: 22px;
    height: 22px;
    border: 2px solid ${({ theme }) => theme.colors.beigeDark};
    border-radius: 100%;
    appearance: none;
    padding: 0;

    &:checked {
      border-color: ${({ theme }) => theme.colors.green};
      background: ${({ theme }) => theme.colors.green};
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: '';
        display: block;
        width: 60%;
        height: 30%;
        border-radius: ${({ theme }) => theme.baseRadius};
        border-bottom: 2px solid ${({ theme }) => theme.colors.white};
        border-left: 2px solid ${({ theme }) => theme.colors.white};
        transform: rotate(-45deg) translateX(1px);
      }
    }

    &:focus,
    &:active {
      box-shadow: 0 2px 9px ${({ theme }) => theme.colors.green};
    }
  }

  &:focus,
  &:active {
    border-color: ${({ theme }) => theme.colors.beigeDark};
    outline: none;
    box-shadow: 0 2px 9px ${({ theme }) => theme.colors.beigeDark};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.beigeDark};
  }

  &:invalid:not(:empty) {
    border-color: ${({ theme }) => theme.colors.red};
  }
`

export default function Input(props: InputProps) {
  const { error, m, mt, mr, mb, ml, ...remainingProps } = props
  return (
    <InputContainer {...{ m, mt, mr, mb, ml }}>
      <BaseInput error={error} {...remainingProps} />
      {error && (
        <Text color="red" size="s" mt="s">
          {error}
        </Text>
      )}
    </InputContainer>
  )
}
