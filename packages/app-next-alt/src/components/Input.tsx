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
import logger from 'utilities/logger'
import VisuallyHidden from './VisuallyHidden'
import { Button } from './Button'
import { toast } from './Toaster'
import Spinner from './Spinner'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  fullWidth?: boolean
  onFileInput?(data: { file?: File; fileName: string }): void
  filePreview?: string
  fileBackgroundColor?: 'beigeDark' | 'greenDark'
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

  input[disabled] + div:first-of-type {
    cursor: not-allowed;
  }
`

const BaseStyles = css<InputProps | TextareaProps>`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  background: ${({ theme }) => theme.colors.white};
  font-family: var(--font-special);
  font-size: ${({ theme }) => theme.fonts.base};
  padding: calc(${({ theme }) => theme.spacings.m} * 2);
  border: 2px solid ${({ theme, error }) => (error ? theme.colors.red : theme.colors.white)};
  border-radius: ${({ theme }) => theme.baseRadius};
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

  &[disabled] {
    color: ${({ theme }) => theme.colors.beigeDark};
    cursor: not-allowed;
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

  :empty {
    padding: 0;
  }

  svg {
    margin-right: ${({ theme }) => theme.spacings.s};
    height: 20px;
    width: 20px;
  }
`

const TogglePasswordButton = styled(Button)`
  position: absolute !important;
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

const FileUploadImage = styled.div<{ $color: 'beigeDark' | 'greenDark' }>`
  background: ${({ theme, $color }) => theme.colors[$color]};
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
  cursor: text;

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

      > span {
        color: ${({ theme }) => theme.colors.black};
      }
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
    fileBackgroundColor = 'beigeDark',
    fullWidth,
    ...remainingProps
  } = props
  const [showPlainPassword, setPlainPassword] = useState(false)
  const [file, setFile] = useState<File>()
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

    let _file = event.target.files[0]
    if (!accept.includes(_file.type)) {
      toast.error('File format not supported.')
      setIsLoading(false)
      return
    }

    try {
      const resized = await resizeBlob(_file, { width: window.outerWidth * 1.5 })
      setFile(
        new File([resized], _file.name, {
          type: _file.type,
          lastModified: Date.now(),
        })
      )
    } catch (error) {
      logger(error as string, true)
      console.error(error)
      setFile(file)
    } finally {
      setIsLoading(false)
      setFileName(_file.name)
    }
  }

  function _onClick(event: React.MouseEvent<HTMLDivElement>) {
    if (!isFileInput) return
    event.preventDefault()
    triggerFileUpload()
  }

  function _onKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!isFileInput) return
    event.preventDefault()
    triggerFileUpload()
  }

  function triggerFileUpload() {
    fileInput?.current?.click()
  }

  useEffect(() => {
    if (!isFileInput) return
    if (file) {
      setImageUrl(getUrlFromBlob(file))
      onFileInput({ file, fileName })
    }
  }, [isFileInput, file, fileName, onFileInput])

  return (
    <InputContainer
      {...{ m, mt, mr, mb, ml }}
      tabIndex={isFileInput ? 0 : undefined}
      fullWidth
      onKeyPress={_onKeyPress}
    >
      <BaseInput
        ref={fileInput}
        error={error}
        tabIndex={isFileInput ? -1 : undefined}
        accept={isFileInput ? accept : undefined}
        hidden={isFileInput}
        type={type === 'password' && showPlainPassword ? 'text' : type}
        onChange={_onChange}
        {...remainingProps}
        aria-describedby={[props['aria-describedby'], props.id + '-error']
          .filter(Boolean)
          .join(' ')}
        aria-invalid={Boolean(error)}
        fullWidth
      />

      {/* If input is used as type="file" we render a custom component. */}
      {isFileInput && (
        <FileUploadContainer onClick={_onClick}>
          <FileUploadImage $color={fileBackgroundColor}>
            {isLoading && <Spinner />}
            {!isLoading && !file ? <Image /> : <img src={previewImage} loading="lazy" alt="" />}
          </FileUploadImage>
          <div>
            <Text color="beigeDark" variant="special">
              {isLoading ? 'Loading...' : fileName ? <span>{fileName}</span> : 'Select a photo'}
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

      <ErrorContainer id={props.id + '-error'}>
        {error && (
          <React.Fragment>
            <AlertCircle color={theme.colors.white} />
            <Text color="white" size="s">
              {error}
            </Text>
          </React.Fragment>
        )}
      </ErrorContainer>
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
