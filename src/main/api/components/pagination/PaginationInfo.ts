// internal imports
import PaginationInfoRenderer from './PaginationInfoRenderer'
import defineStyle from '../../styling/defineStyle'

// external imports
import React, { ReactNode } from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'
import { ITheme } from 'office-ui-fabric-react'

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
    return PaginationInfoRenderer.render(props)
  }
})

// --- PaginationInfoData -------------------------------------------

type PaginationInfoData = PaginationInfoProps

// --- exports ------------------------------------------------------

export default PaginationInfo

export {
  PaginationInfoData
}
