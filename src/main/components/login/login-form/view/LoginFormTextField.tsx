// external imports
import React from 'react'
import { TextField, Label } from 'office-ui-fabric-react'

// derived imports
const { useCallback, useRef, useState } = React

// --- LoginFormTextField -------------------------------------------

function LoginFormTextField(props: LoginFormTextFieldProps) {
  const
    [value, setValue] = useState(''),
    [errorMsg, setErrorMsg] = useState(''),
    valueChangedRef = useRef(false),

    validate = () => {
      const msg = value.length === 0
        ? `Please enter field "${props.label}"`
        : ''

      if (msg !== errorMsg) {
        setErrorMsg(msg)
      }
    },

    onChange = useCallback((ev: any) => {
      setValue(ev.target.value)
      valueChangedRef.current = true,
      setErrorMsg('')
    }, []),

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

  if (props.forceValidation) {
    validate()
  }

  return (
    <div>
      <div>
        <Label disabled={props.disabled}>{props.label}</Label>
      </div>
      <TextField
        key={props.name}
        value={value}
        errorMessage={errorMsg}
        type={props.isPassword ? 'password' : 'text'}
        validateOnFocusOut={false}
        validateOnFocusIn={false}
        validateOnLoad={false}
        onBlur={onEnter}
        onKeyDown={onEnter}
        onChange={onChange}
        disabled={props.disabled}
      />
      <input
        type="hidden"
        name={props.name}
        value={value}
        data-login-field
      />
    </div>
  )
}

// --- locals -------------------------------------------------------

type LoginFormTextFieldProps = {
  name: string,
  label: string,
  isPassword?: boolean,
  disabled?: boolean,
  forceValidation?: boolean
}

// --- exports ------------------------------------------------------

export default LoginFormTextField
