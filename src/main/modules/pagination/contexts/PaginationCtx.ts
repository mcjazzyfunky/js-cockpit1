// external imports
import { context } from 'js-react-utils'

// internal import
import validatePaginationCtrl from '../validation/validatePaginationCtrl'
import PaginationCtrl from '../types/PaginationCtrl'

// --- PaginationCtx ------------------------------------------------

const PaginationCtx = context<PaginationCtrl>({
  displayName: 'PaginationCtx',
  validate: validatePaginationCtrl,

  defaultValue: {
    getPageIndex: () => - 1,
    getPageSize: () => -1,
    getTotalItemCount: () => -1,
    moveToPage: () => Promise.resolve(-1),
    setPageSize: () => Promise.resolve(-1)
  }
})

// --- exports ------------------------------------------------------

export default PaginationCtx
