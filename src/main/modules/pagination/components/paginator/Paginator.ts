// external imports
import { component } from 'js-react-utils'

// internal imports
import PaginatorProps from './types/PaginatorProps'
import PaginatorView from './PaginatorView'
import validatePaginatorProps from './validatePaginatorProps'

// --- Paginator ----------------------------------------------------

const Paginator = component<PaginatorProps>({
  displayName: 'Paginator',
  validate: validatePaginatorProps,
  render: PaginatorView
})

// --- exports ------------------------------------------------------

export default Paginator
