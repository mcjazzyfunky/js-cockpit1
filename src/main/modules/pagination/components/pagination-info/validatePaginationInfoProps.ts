// external imports
import { Spec } from 'js-spec'

// --- validatePagniationInfoProps -----------------------------------

const validatePaginationInfoProps = Spec.checkProps({
  required: {
    about: Spec.oneOf('items')
  }
})

// --- exports -------------------------------------------------------

export default validatePaginationInfoProps
