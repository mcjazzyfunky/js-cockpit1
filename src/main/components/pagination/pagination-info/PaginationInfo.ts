// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import PaginationInfoProps from './types/PaginationInfoProps'
import PaginationInfoView from './view/renderPaginatorInfo'

// --- PaginationInfo ---------------------------------------------

const PaginationInfo = component<PaginationInfoProps>({
  displayName: 'PaginationInfo',

  validate: Spec.checkProps({
    required: {
      pageIndex: Spec.nonnegativeInteger,
      pageSize: Spec.positiveInteger,
      totalItemCOunt: Spec.nonnegativeInteger,
      about: Spec.oneOf('items')
    }
  }),

  render: PaginationInfoView
})

// --- exports ------------------------------------------------------

export default PaginationInfo
