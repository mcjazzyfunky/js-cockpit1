// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports

// --- components ----------------------------------------------------

const TextInput = component({
  displayName: 'TextInput',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validateTextInputProps) },

  render: TextInputView
})

// --- types ---------------------------------------------------------

type TextInputProps = {
  label?: string,
  field?: string
}

// --- validation ----------------------------------------------------

const validateTextInputProps = Spec.checkProps({
  optional: {
    label: Spec.string,
    field: Spec.string,
  }
})

// --- views ---------------------------------------------------------

function TextInputView({
  label,
  field
}: TextInputProps) {
  return 'TextInput'
}

// --- exports -------------------------------------------------------

export default TextInput
