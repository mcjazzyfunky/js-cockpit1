// external imports
import { context } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal import
import PaginationCtrl from '../types/PaginationCtrl'

// --- context -------------------------------------------------------

const PaginationCtx = context<PaginationCtrl>({
  displayName: 'PaginationCtx',
 
  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validatePaginationCtrl) },

  defaultValue: {
    getPageIndex: () => - 1,
    getPageSize: () => -1,
    getTotalItemCount: () => -1,
    moveToPage: () => {},
    setPageSize: () => {},
    subscribe: () => () => {}
  }
})

// --- validation ----------------------------------------------------

const validatePaginationCtrl = Spec.exact({
  getPageIndex: Spec.function,
  getPageSize: Spec.function,
  getTotalItemCount: Spec.function,
  moveToPage: Spec.function,
  setPageSize: Spec.function,
  subscribe: Spec.function
})

// --- exports -------------------------------------------------------

export default PaginationCtx
