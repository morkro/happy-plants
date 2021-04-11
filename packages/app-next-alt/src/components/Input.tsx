import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import { AlertCircle, Eye, EyeOff, Image } from 'react-feather'
import { theme } from 'theme'
import { Text } from 'components/Typography'
import { WithMarginProps, WithMarginStyles } from 'utilities/withProps'
import noop from 'utilities/noop'
import { getUrlFromBlob, isBlobbable, resizeBlob } from 'utilities/blob'
import VisuallyHidden from './VisuallyHidden'
import { Button } from './Button'
import { toast } from './Toaster'
import Spinner from './Spinner'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  fullWidth?: boolean
  onFileInput?(data: { file: File | null; fileName: string }): void
  filePreview?: string
}

interface BaseTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  fullWidth?: boolean
  height?: string
}

type InputProps = WithMarginProps<BaseInputProps>
type TextareaProps = WithMarginProps<BaseTextareaProps>

const InputContainer = styled.div<InputProps | TextareaProps>`
  ${WithMarginStyles}
  position: relative;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

const BaseStyles = css<InputProps | TextareaProps>`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  background: ${({ theme }) => theme.colors.white};
  font-family: var(--font-special);
  font-size: ${({ theme }) => theme.fonts.base};
  padding: calc(${({ theme }) => theme.spacings.m} * 2);
  border: 2px solid ${({ theme, error }) => (error ? theme.colors.red : theme.colors.white)};
  color: var(--brand-green-dark);
  transition: box-shadow var(--base-transition) ease-in-out;

  ${({ error }) =>
    error &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}

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

const BaseInput = styled.input<InputProps>`
  ${BaseStyles}

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

  &[type='file'] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
`

const BaseTextarea = styled.textarea<TextareaProps>`
  ${BaseStyles}
  height: ${({ height }) => height || 'auto'};
`

const ErrorContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.red};
  padding: ${({ theme }) => theme.spacings.s};
  display: flex;
  align-items: center;
  border-bottom-left-radius: ${({ theme }) => theme.baseRadius};
  border-bottom-right-radius: ${({ theme }) => theme.baseRadius};

  svg {
    margin-right: ${({ theme }) => theme.spacings.s};
    height: 20px;
    width: 20px;
  }
`

const TogglePasswordButton = styled(Button)`
  position: absolute;
  z-index: 1;
  top: calc(1.5 * ${(props) => props.theme.spacings.m});
  right: calc(1.5 * ${(props) => props.theme.spacings.m});
  background: transparent;
  border: none;
  box-shadow: none;
  color: ${(props) => props.theme.colors.beigeDark};
  display: flex;

  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.greenDark};
    outline: none;
  }
`

const FileUploadImage = styled.div`
  background: ${({ theme }) => theme.colors.beigeDark};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  height: var(--size);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const FileUploadContainer = styled.div`
  --size: 55px; // Calculated height of an input element
  display: grid;
  grid-template-columns: var(--size) 1fr;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.baseRadius};
  overflow: hidden;

  & > div:not(${FileUploadImage}) {
    padding: calc(${({ theme }) => theme.spacings.m} * 1.5);
    display: flex;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    & p {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`

export function Input(props: InputProps) {
  const {
    error,
    m,
    mt,
    mr,
    mb,
    ml,
    type,
    onChange = noop,
    onFileInput = noop,
    filePreview,
    accept = 'image/png, image/jpg, image/jpeg',
    ...remainingProps
  } = props
  const [showPlainPassword, setPlainPassword] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isFileInput = type === 'file'
  const previewImage = filePreview && !isBlobbable(file) ? filePreview : imageUrl
  const fileInput = useRef<HTMLInputElement>(null)

  async function _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event)
    if (!isFileInput || !event?.target?.files?.length) return

    setIsLoading(true)

    const file = event.target.files[0]
    if (!accept.includes(file.type)) {
      toast.error('File format not supported.')
      setIsLoading(false)
      return
    }

    try {
      const resized = await resizeBlob(file, { width: window.outerWidth * 1.5 })
      setFile(
        () =>
          new File([resized], file.name, {
            type: file.type,
            lastModified: Date.now(),
          })
      )
    } catch {
      setFile(file)
    }

    setIsLoading(false)
    setFileName(file.name)
  }

  function triggerFileUpload() {
    if (!isFileInput) return
    fileInput?.current?.click()
  }

  useEffect(() => {
    console.log('ho oftn?')
    setImageUrl(getUrlFromBlob(file as Blob))
    onFileInput({ file, fileName })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <InputContainer
      {...{ m, mt, mr, mb, ml }}
      tabIndex={isFileInput ? 0 : undefined}
      onKeyPress={triggerFileUpload}
      onClick={triggerFileUpload}
    >
      <BaseInput
        ref={fileInput}
        error={error}
        tabIndex={isFileInput ? -1 : undefined}
        accept={isFileInput ? accept : undefined}
        type={type === 'password' && showPlainPassword ? 'text' : type}
        onChange={_onChange}
        {...remainingProps}
      />

      {/* If input is used as type="file" we render a custom component. */}
      {isFileInput && (
        <FileUploadContainer>
          <FileUploadImage>
            {isLoading && <Spinner />}
            {!isLoading && !file ? <Image /> : <img src={previewImage} alt="" />}
          </FileUploadImage>
          <div>
            <Text color="beigeDark" variant="special">
              {isLoading ? 'Loading...' : fileName || 'Select a photo'}
            </Text>
          </div>
        </FileUploadContainer>
      )}

      {/* If the input is used as type="password" we show a button to toggle the content. */}
      {type === 'password' && (
        <TogglePasswordButton
          onClick={(event) => {
            event.preventDefault()
            setPlainPassword(!showPlainPassword)
          }}
          type="button"
          size="s"
        >
          {showPlainPassword ? (
            <EyeOff aria-hidden="true" focusable="false" />
          ) : (
            <Eye aria-hidden="true" focusable="false" />
          )}
          <VisuallyHidden>{showPlainPassword ? 'Hide password' : 'Show password'}</VisuallyHidden>
        </TogglePasswordButton>
      )}

      {error && (
        <ErrorContainer>
          <AlertCircle color={theme.colors.white} />
          <Text color="white" size="s">
            {error}
          </Text>
        </ErrorContainer>
      )}
    </InputContainer>
  )
}

export function Textarea(props: TextareaProps) {
  const { error, m, mt, mr, mb, ml, ...remainingProps } = props

  return (
    <InputContainer {...{ m, mt, mr, mb, ml }}>
      <BaseTextarea error={error} {...remainingProps} />
      {error && (
        <ErrorContainer>
          <AlertCircle color={theme.colors.white} />
          <Text color="white" size="s">
            {error}
          </Text>
        </ErrorContainer>
      )}
    </InputContainer>
  )
}
