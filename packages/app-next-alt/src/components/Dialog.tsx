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
    background-color: rgba(43, 46, 56, 0.9);
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
    padding: ${({ theme }) => theme.spacings.m};
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-areas:
      "title close"
      "content content";

    > div {
      grid-area: content;
      overflow: scroll;
      max-height: 70vh;
      padding-bottom: ${({ theme }) => theme.spacings.m};
    }
  }

  .dialog-close-button {
    grid-area: close;
    background-color: ${({ theme }) => theme.colors.blue};
    box-shadow: 0px 2px 9px ${({ theme }) => theme.colors.blue};
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacings.l};
  }

  .dialog-title {
    grid-area: title;
    margin-bottom: ${({ theme }) => theme.spacings.l};
    ${HeadingBaseStyles}
    font-weight: 500;
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
