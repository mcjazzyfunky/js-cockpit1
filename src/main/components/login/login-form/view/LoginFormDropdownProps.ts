// --- LoginFormDropdownProps ----------------------------------------

type LoginFormDropdownProps = {
  name: string,
  label: string,
  options: { value: string, text: string }[],
  defaultValue?: string,
  disabled?: boolean,
  forceValidation?: boolean,

  onValueChanged?: (ev: {
    type: 'valueChanged',
    value: string,
    name: string
  }) => void
}

// --- exports -------------------------------------------------------

export default LoginFormDropdownProps

