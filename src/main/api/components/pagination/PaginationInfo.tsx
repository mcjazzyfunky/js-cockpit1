// internal imports
import defineStyle from '../../styling/defineStyle'

// external imports
import React, { ReactNode } from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'
import { ITheme } from 'office-ui-fabric-react'

// --- PaginationInfoStyle ----------------------------------------

const PaginationInfoStyle = defineStyle((theme: ITheme) => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- PaginationInfo ---------------------------------------------

type PaginationInfoProps = {
  pageIndex: number,
  pageSize: number,
  totalItemCount: number,
  about: 'items'
}

const PaginationInfo = defineComponent<PaginationInfoProps>({
  displayName: 'PaginationInfo',

  properties: {
    pageIndex: {
      type: Number,
      required: true,
      validate: Spec.nonnegativeInteger,
    },

    pageSize: {
      type: Number,
      required: true,
      validate: Spec.positiveNumber
    },

    totalItemCount: {
      type: Number,
      required: true,
      validate: Spec.nonnegativeInteger
    },

    about: {
      type: String,
      required: true,
      validate: Spec.oneOf('items')
    }
  },

  render(props: PaginationInfoProps) {
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

    return (
      <PaginationInfoStyle>
        {
          (classes: any) =>
            <div className={classes.container}>
               { content }
            </div>
        }
      </PaginationInfoStyle>
    ) 
  }
})

// --- exports ------------------------------------------------------

export default PaginationInfo
