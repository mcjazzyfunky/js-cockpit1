// external imports
import React, { ReactNode } from 'react'

// internal imports
import stylePaginationInfo from './stylePaginatorInfo'
import PaginationInfoProps from '../types/PaginationInfoProps'

// --- PaginationInfoRenderer ---------------------------------------

function renderPaginationInfo(props: PaginationInfoProps) {
  let content: ReactNode = null

  const
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

  return stylePaginationInfo(classes =>
    <div className={classes.container}>
        { content }
    </div>
  ) 
}

// --- exports ------------------------------------------------------

export default renderPaginationInfo
