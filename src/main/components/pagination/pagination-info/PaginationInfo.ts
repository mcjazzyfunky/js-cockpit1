// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import PaginationInfoProps from './types/PaginationInfoProps'
import PaginationInfoView from './view/renderPaginatorInfo'

// --- PaginationInfo ---------------------------------------------

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
    return PaginationInfoView(props)
  }
})

// --- exports ------------------------------------------------------

export default PaginationInfo
