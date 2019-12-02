// external imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import defineStyle from '../../../styling/defineStyle'
import usePagination from '../hooks/usePagination'

// --- components ----------------------------------------------------

const PaginationInfo = component<PaginationInfoProps>({
  displayName: 'PaginationInfo',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validatePaginationInfoProps) },

  
  render: PaginationInfoView
})

// --- types ---------------------------------------------------------

type PaginationInfoProps = {
  about: 'items'
}

// --- validation ----------------------------------------------------

const validatePaginationInfoProps = Spec.checkProps({
  required: {
    about: Spec.oneOf('items')
  }
})

// --- views ---------------------------------------------------------

function PaginationInfoView({
  about
}: PaginationInfoProps) {
  let content: ReactNode = null

  const
    ctrl = usePagination(),
    classes = getPaginationInfoClasses(),
    pageIndex = ctrl.getPageIndex(),
    pageSize = ctrl.getPageSize(),
    totalItemCount = ctrl.getTotalItemCount(),
    itemNumberStart = pageIndex * pageSize + 1,
    itemNumberEnd = Math.min(totalItemCount, (pageIndex + 1) * pageSize),
    valuesValid = pageIndex >= 0 && pageSize >= 0 && totalItemCount >= 0

  switch (about) {
    case 'items':
      content =
        valuesValid
          ? <div>
              Items {itemNumberStart} - {itemNumberEnd} of {totalItemCount}
            </div>
          : <div>Items ? - ? of ?</div>
    break
  }

  return (
    <div className={classes.container}>
      { content }
    </div>
  ) 
}

// ---- styles -------------------------------------------------------

const getPaginationInfoClasses = defineStyle(theme => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- exports -------------------------------------------------------

export default PaginationInfo
