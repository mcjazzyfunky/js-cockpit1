// external import
import { Spec } from 'js-spec'

// --- validateUserMenuProps ----------------------------------------

const validateUserMenuProps = Spec.checkProps({
  optional: {
    userName: Spec.string,
    fullName: Spec.string,
  }
})

// --- exports ------------------------------------------------------

export default validateUserMenuProps
