// external import
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import PaginationCtx from '../contexts/PaginationCtx'
import PaginationCtrl from '../types/PaginationCtrl'

// --- components ----------------------------------------------------

const PaginationProvider = component<PaginationProviderProps>({
   displayName: 'PaginationProvider',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validatePaginationProviderProps) },
  
   render: PaginationProviderView
})

// --- types ---------------------------------------------------------

type PaginationProviderProps = {
  controller: PaginationCtrl,
  children: ReactNode
}

// --- validation ----------------------------------------------------

const validatePaginationProviderProps = Spec.checkProps({
  required: {
    controller: Spec.exact({
      getPageIndex: Spec.function,
      getPageSize: Spec.function,
      getTotalItemCount: Spec.function,
      moveToPage: Spec.function,
      setPageSize: Spec.function,
      subscribe: Spec.function
    })
  },

  optional: {
    children: isNode
  }
})

// --- views ---------------------------------------------------------

function PaginationProviderView({
  controller,
  children 
}: PaginationProviderProps) {
  return (
    <PaginationCtx.Provider value={controller}>
      {children}
    </PaginationCtx.Provider>
  )
}

// --- exports -------------------------------------------------------

export default PaginationProvider
