import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Text } from './Typography'

const Container = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) => ($active ? theme.colors.green : theme.colors.white)};
  border: none;
  border-radius: ${({ theme }) => theme.baseRadius};
  padding: ${({ theme }) => theme.spacings.m};
`

type TagProps = PropsWithChildren<
  React.HTMLAttributes<HTMLButtonElement> & {
    active?: boolean
  }
>

export default function Tag(props: TagProps) {
  const { active = false, children, ...rest } = props
  return (
    <Container $active={active} {...rest}>
      <Text color={active ? 'white' : 'greenDark'}>{children}</Text>
    </Container>
  )
}