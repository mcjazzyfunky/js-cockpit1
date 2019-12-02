// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import PaginatorProps from './types/PaginatorProps'
import PaginatorView from './view/PaginatorView'
import validatePaginatorProps from '../validation/validatPaginatorProps'

// --- Paginator -----------------------------------------------------

const Paginator = component<PaginatorProps>({
  displayName: 'Paginator',
  validate: validatePaginatorProps,
  render: PaginatorView
})

// --- exports -------------------------------------------------------

export default Paginator
