// extenal imports
import { Spec } from 'js-spec'

// internal imports
import { PAGE_SIZE_OPTIONS } from '../../misc/constants'

// --- validatePageSizeSelecorProps ---------------------------------

const validatePageSizeSelectorProps = Spec.checkProps({
  required: {
    pageSize: Spec.in(PAGE_SIZE_OPTIONS)
  },

  optional: {
    onPageSizeChange: Spec.function
  }
})

// --- exports ------------------------------------------------------

export default validatePageSizeSelectorProps
