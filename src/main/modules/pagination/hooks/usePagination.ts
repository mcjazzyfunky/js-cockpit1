// internal imports
import React from 'react'
import PaginationCtx from '../contexts/PaginationCtx'

// derived imports
const { useContext } = React

// --- usePaginationCtrl --------------------------------------------

function usePagination() {
  return useContext(PaginationCtx)[0]
}

// --- exports ------------------------------------------------------

export default usePagination
