// external import
import { Spec } from 'js-spec'

// --- validateTextInputProps ----------------------------------------

const validateTextInputProps = Spec.checkProps({
  optional: {
    label: Spec.string,
    name: Spec.string,
    value: Spec.string, 
    disabled: Spec.or(Spec.boolean, Spec.function),
    errorMessage: Spec.string,
    id: Spec.string,
    grow: Spec.float
  }
})

// --- exports -------------------------------------------------------

export default validateTextInputProps
