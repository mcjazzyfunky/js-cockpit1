// external imports
import React from 'react'

// internal imports
import PaginationCtx from '../contexts/PaginationCtx'
import PaginationCtrl from '../types/PaginationCtrl'

// derived imports
const { useContext } = React

// --- usePaginationCtrl ---------------------------------------------

function usePagination(): PaginationCtrl {
  return useContext(PaginationCtx)
}

// --- exports -------------------------------------------------------

export default usePagination
