// external imports
import { component } from 'js-react-utils'

// internal imports
import PaginationInfoProps from './types/PaginationInfoProps'
import PaginationInfoView from './PaginationInfoView'
import validatePaginationInfoProps from './validatePaginationInfoProps'

// --- PaginationInfo ----------------------------------------------

const PaginationInfo = component<PaginationInfoProps>({
  displayName: 'PaginationInfo',
  validate: validatePaginationInfoProps,
  render: PaginationInfoView
})

// --- exports -------------------------------------------------------

export default PaginationInfo
