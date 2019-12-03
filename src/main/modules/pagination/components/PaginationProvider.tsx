// external import
import React from 'react'
import { component } from 'js-react-utils'
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
  children: any
}

// --- validation ----------------------------------------------------

const validatePaginationProviderProps = Spec.any // TODO

// --- views ---------------------------------------------------------

function PaginationProviderView({
  controller,
  children 
}: PaginationProviderProps) {
  return (
    <PaginationCtx.Provider value={[controller]}>
      {children}
    </PaginationCtx.Provider>
  )
}

// --- exports -------------------------------------------------------

export default PaginationProvider
