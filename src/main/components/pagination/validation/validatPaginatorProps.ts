// extenal imports
import { Spec } from 'js-spec'

// --- validatePaginatorProps ----------------------------------------

const validatePaginatorProps = Spec.checkProps({
  required: {
    pageIndex: Spec.nonnegativeInteger,
    pageSize: Spec.positiveInteger,
    totalItemCount: Spec.nonnegativeInteger,
    about: Spec.oneOf('items')
  },

  optional: {
    onPageChange: Spec.function
  }
})

// --- exports -------------------------------------------------------

export default validatePaginatorProps
