// external imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'

// internal imports
import getPaginationInfoClasses from './getPaginationInfoClasses'
import PaginationInfoViewProps from '../types/PaginationInfoViewProps'

// --- PaginationInfoView --------------------------------------------

const PaginationInfoView = component<PaginationInfoViewProps>(
  'PaginationInfoView', props => {

  let content: ReactNode = null

  const
    classes = getPaginationInfoClasses(),
    pageIndex = props.pageIndex,
    pageSize = props.pageSize,
    totalItemCount = props.totalItemCount,
    itemNumberStart = pageIndex * pageSize + 1,
    itemNumberEnd = Math.min(totalItemCount, (pageIndex + 1) * pageSize)

  switch (props.about) {
    case 'items':
      content =
        <div>
          Items {itemNumberStart}-{itemNumberEnd} of {totalItemCount}
        </div>
    break
  }

  return (
    <div className={classes.container}>
      { content }
    </div>
  ) 
})

// --- exports -------------------------------------------------------

export default PaginationInfoView
