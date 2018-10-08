// internal imports
import { PaginationInfoModel } from './PaginationInfo'
import defineStyle from '../../styling/defineStyle'

// external imports
import React, { ReactNode } from 'react'
import { ITheme } from 'office-ui-fabric-react'

// --- PaginationInfoStyle ----------------------------------------

const stylePaginationInfo = defineStyle((theme: ITheme) => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- PaginationInfoRenderer ---------------------------------------

const PaginationInfoRenderer = {
  render(model: PaginationInfoModel) {
    let content: ReactNode = null

    const
      pageIndex = model.pageIndex,
      pageSize = model.pageSize,
      totalItemCount = model.totalItemCount,
      itemNumberStart = pageIndex * pageSize + 1,
      itemNumberEnd = Math.min(totalItemCount, (pageIndex + 1) * pageSize)

    switch (model.about) {
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
}

// --- exports ------------------------------------------------------

export default PaginationInfoRenderer
