// --- LoginFormTextFieldProps --------------------------------------

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

// --- exports ------------------------------------------------------

export default LoginFormTextFieldProps
