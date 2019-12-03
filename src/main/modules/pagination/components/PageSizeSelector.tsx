// external imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import defineStyle from '../../../styling/defineStyle'
import usePagination from '../hooks/usePagination'

// --- components ----------------------------------------------------

const PageSizeSelector = component<PageSizeSelectorProps>({
  displayName: 'PageSizeSelctor',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validatePageSizeSelectorProps) },

  
  render: PageSizeSelectorView
})

// --- types ---------------------------------------------------------

type PageSizeSelectorProps = {
}

// --- validation ----------------------------------------------------

const validatePageSizeSelectorProps = Spec.checkProps({
})

// --- views ---------------------------------------------------------

function PageSizeSelectorView({
}: PageSizeSelectorProps) {
  return <div>PageSizeSelector</div>
}

// ---- styles -------------------------------------------------------

const getPageSizeSelectorClasses = defineStyle(theme => ({
}))

// --- exports -------------------------------------------------------

export default PageSizeSelector
