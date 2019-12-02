// external imports
import { Spec } from 'js-spec'

// --- validateDateInputProps ----------------------------------------

const validateDateInputProps = Spec.checkProps({
  optional: {
    label: Spec.string,
    name: Spec.string,
    id: Spec.string,
    grow: Spec.float
  }
})

// --- exports -------------------------------------------------------

export default validateDateInputProps
