// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { TextField, Label } from 'office-ui-fabric-react'

// derived imports
const { useCallback, useRef, useState } = React

// --- LoginFormTextField -------------------------------------------

const LoginFormTextField = component({
  displayName: 'LoginFormTextField',
  memoize: true,
  render: LoginFormTextFieldView
})

// --- locals -------------------------------------------------------

type LoginFormTextFieldProps = {
  name: string,
  label: string,
  isPassword?: boolean,
  defaultValue?: string,
  disabled?: boolean,
  forceValidation?: boolean,

  onValueChanged?: (ev: {
    type: 'valueChanged',
    value: string,
    name: string
  }) => void
}

function LoginFormTextFieldView({
  name,
  label,
  isPassword = false,
  defaultValue = '',
  disabled = false,
  forceValidation = false,
  onValueChanged
}: LoginFormTextFieldProps) {
  const
    [value, setValue] = useState(defaultValue),
    [errorMsg, setErrorMsg] = useState(''),
    valueChangedRef = useRef(false),

    validate = () => {
      const msg = value.length === 0
        ? `Please enter field "${label}"`
        : ''

      if (msg !== errorMsg) {
        setErrorMsg(msg)
      }
    },

    onChange = useCallback((ev: any) => {
      const newValue = ev.target.value

      setValue(newValue)
      valueChangedRef.current = true,
      setErrorMsg('')
      
      if (onValueChanged) {
        onValueChanged({
          type: 'valueChanged',
          value: newValue,
          name
        })
      }
    }, [name]),

    onEnter = useCallback((ev: any) => {
      if (!ev.keyCode || ev.keyCode === 13) {
        const trimmedValue = value.trim()

        if (value !== trimmedValue) {
          setValue(trimmedValue)
        } else if (valueChangedRef.current) {
          validate()
          valueChangedRef.current = false
        }
      }
    }, [value])

  if (forceValidation) {
    validate()
  }

  return (
    <div>
      <div>
        <Label disabled={disabled}>{label}</Label>
      </div>
      <TextField
        key={name}
        value={value}
        errorMessage={errorMsg}
        type={isPassword ? 'password' : 'text'}
        validateOnFocusOut={false}
        validateOnFocusIn={false}
        validateOnLoad={false}
        onBlur={onEnter}
        onKeyDown={onEnter}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

// --- exports ------------------------------------------------------

export default LoginFormTextField
