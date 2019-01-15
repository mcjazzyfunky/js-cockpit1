// external imports
import React, { ReactNode } from 'react'
import { ITheme } from 'office-ui-fabric-react'

// internal imports
import PaginationInfoProps from './PaginationInfoProps'
import defineStyle from '../../styling/defineStyle'

// --- PaginationInfoStyle ----------------------------------------

const stylePaginationInfo = defineStyle((theme: ITheme) => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- PaginationInfoRenderer ---------------------------------------

function PaginationInfoView(props: PaginationInfoProps) {
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

export default PaginationInfoView
