// external imports
import { Spec } from 'js-spec'

// --- validateLogoutButtonProps ------------------------------------

const validateLogoutButtonProps = Spec.checkProps({
  optional: {
    onClick: Spec.function
  }
})

// --- exports ------------------------------------------------------

export default validateLogoutButtonProps
