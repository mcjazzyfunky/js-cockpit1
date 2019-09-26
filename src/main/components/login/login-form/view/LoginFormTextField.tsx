// external imports
import React from 'react'
import { TextField, Label } from 'office-ui-fabric-react'

// derived imports
const { useCallback, useRef, useState } = React

// --- LoginFormTextField -------------------------------------------

function LoginFormTextField(props: LoginFormTextFieldProps) {
  const
    [value, setValue] = useState(''),
    valueChangedRef = useRef(false),
    errorMsgRef = useRef(''),

    onGetErrorMessage = useCallback((value: string) => {
      if (valueChangedRef.current) {
        if (value.length === 0) {
          errorMsgRef.current = 
            `Please enter field "${props.label}"`
        } else {
          errorMsgRef.current = ''
        }
      }
 
      valueChangedRef.current = false

      return errorMsgRef.current as string
    }, [props.label]),

    onChange = useCallback((ev: any) => {
      valueChangedRef.current = true
      setValue(ev.target.value)
    }, []),

    onBlur = useCallback(() => {
      const trimmedValue = value.trim()

      if (value !== trimmedValue) {
        setValue(trimmedValue)
      }
    }, [value]),

    onKeyDown = useCallback((ev: any) => {
      if (ev.keyCode === 13) {
        const trimmedValue = value.trim()

        if (value !== trimmedValue) {
          setValue(trimmedValue)
        }
      }
    }, [value])

  return (
    <div>
      <div>
        <Label disabled={props.disabled}>{props.label}</Label>
      </div>
      <TextField
        key={props.name}
        value={value}
        type={props.isPassword ? 'password' : 'text'}
        validateOnFocusOut={true}
        validateOnFocusIn={false}
        validateOnLoad={false}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onGetErrorMessage={onGetErrorMessage}
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
  disabled?: boolean
}

// --- exports ------------------------------------------------------

export default LoginFormTextField
