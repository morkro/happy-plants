import React from 'react'
import { A11yDialog } from 'react-a11y-dialog'
import A11yDialogInstance from 'a11y-dialog'
import { X } from 'react-feather'
import { createGlobalStyle } from 'styled-components'
import { theme } from 'theme'
import { HeadingBaseStyles } from './Typography'

export type Events = {
  show: () => void
  hide: () => void
}

export type DialogProps = React.PropsWithChildren<{
  id: string
  title: string
  reference: (instance: A11yDialogInstance) => void
}>

const DialogStyles = createGlobalStyle`
  .dialog-container,
  .dialog-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .dialog-container {
    z-index: 2;
    display: flex;

    &[aria-hidden='true'] {
      display: none;
    }
  }

  .dialog-overlay {
    background-color: rgba(10, 62, 43, 0.8);
  }

  .dialog-content {
    margin: auto;
    margin-left: ${({ theme }) => theme.spacings.m};
    margin-right: ${({ theme }) => theme.spacings.m};
    z-index: 2;
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.beige};
    border-radius: ${({ theme }) => theme.baseRadius};
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-areas:
      "title close"
      "content content";

    > div {
      grid-area: content;
      overflow: scroll;
      max-height: 70vh;
      padding: ${({ theme }) => theme.spacings.m};
      padding-bottom: ${({ theme }) => theme.spacings.l};
    }
  }

  .dialog-close-button {
    grid-area: close;
    background-color: ${({ theme }) => theme.colors.blue};
    box-shadow: 0px 2px 9px ${({ theme }) => theme.colors.blue};
    border: 2px solid ${({ theme }) => theme.colors.blue};
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacings.m};
    margin-right: ${({ theme }) => theme.spacings.m};
    margin-bottom: ${({ theme }) => theme.spacings.l};

    &:hover,
    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.white};
    }

    > svg {
      width: 20px;
      height: 20px;
    }
  }

  .dialog-title {
    ${HeadingBaseStyles}
    grid-area: title;
    font-weight: 500;
    padding: ${({ theme }) => theme.spacings.m};
    padding-bottom: 0;
    margin-bottom: ${({ theme }) => theme.spacings.l};
  }
`

export default function Dialog(props: DialogProps) {
  return (
    <React.Fragment>
      {/** The following props are required because we reuse the Heading styles */}
      <DialogStyles as="h6" size="m" color="greenDark" />
      <A11yDialog
        id={props.id}
        dialogRef={props.reference}
        title={props.title}
        classNames={{
          container: 'dialog-container',
          overlay: 'dialog-overlay',
          dialog: 'dialog-content',
          title: 'dialog-title',
          closeButton: 'dialog-close-button',
        }}
        closeButtonContent={<X color={theme.colors.white} />}
      >
        <div>{props.children}</div>
      </A11yDialog>
    </React.Fragment>
  )
}
