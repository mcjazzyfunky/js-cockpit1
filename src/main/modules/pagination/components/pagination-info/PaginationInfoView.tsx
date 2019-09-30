// external imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'

// internal imports
import usePagination from '../../hooks/usePagination'
import getPaginationInfoClasses from './getPaginationInfoClasses'
import PaginationInfoViewProps from './types/PaginationInfoViewProps'

// --- PaginationInfoView -------------------------------------------

const PaginationInfoView = component<PaginationInfoViewProps>(
  'PaginationInfoView', props => {

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

  switch (props.about) {
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
})

// --- exports ------------------------------------------------------

export default PaginationInfoView