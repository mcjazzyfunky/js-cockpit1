// external imports
import { Spec } from 'js-spec'

// --- validatePaginationCtrl ----------------------------------------

const validatePaginationCtrl = Spec.exact({
  getPageIndex: Spec.function,
  getPageSize: Spec.function,
  getTotalItemCount: Spec.function,
  moveToPage: Spec.function,
  setPageSize: Spec.function
})

// --- exports -------------------------------------------------------

export default validatePaginationCtrl
