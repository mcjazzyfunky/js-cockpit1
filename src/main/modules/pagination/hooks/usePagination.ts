// internal imports
import React from 'react'
import PaginationCtx from '../contexts/PaginationCtx'

// derived imports
const { useContext } = React

// --- usePaginationCtrl --------------------------------------------

function usePagination() {
  return useContext(PaginationCtx)
}

// --- exports ------------------------------------------------------

export default usePagination
