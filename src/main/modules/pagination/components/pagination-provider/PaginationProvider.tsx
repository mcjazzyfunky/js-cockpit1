// external import
import React from 'react'
import { component } from 'js-react-utils'

// internal imports
import PaginationCtx from '../../contexts/PaginationCtx'
import PaginationCtrl from '../../types/PaginationCtrl'

// --- PaginationProvider --------------------------------------------

const PaginationProvider = component<{ controller: PaginationCtrl, children: any }>({
   displayName: 'PaginationProvider',

   render({ controller, children }) {
     return <PaginationCtx.Provider value={[controller]}>
       {children}
     </PaginationCtx.Provider>
   }
})

// --- exports -------------------------------------------------------

export default PaginationProvider
