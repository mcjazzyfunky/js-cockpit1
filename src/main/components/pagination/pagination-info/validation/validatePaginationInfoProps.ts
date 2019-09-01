// external imports
import { Spec } from 'js-spec'

// --- validatePagniationInfoProps ----------------------------------

const validatePaginationInfoProps = Spec.checkProps({
  required: {
    pageIndex: Spec.nonnegativeInteger,
    pageSize: Spec.positiveInteger,
    totalItemCOunt: Spec.nonnegativeInteger,
    about: Spec.oneOf('items')
  }
})

// --- exports ------------------------------------------------------

export default validatePaginationInfoProps
