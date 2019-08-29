// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import PaginatorProps from './types/PaginatorProps'
import PaginatorView from './view/renderPaginator'

// --- Paginator ----------------------------------------------------

const Paginator = component<PaginatorProps>({
  displayName: 'Paginator',

  validate: Spec.checkProps({
    required: {
      pageIndex: Spec.nonnegativeInteger,
      pageSize: Spec.positiveInteger,
      totalItemCOunt: Spec.nonnegativeInteger,
      about: Spec.oneOf('items')
    },

    optional: {
      onPageChange: Spec.function
    }
  }),

  render: PaginatorView
})

// --- exports ------------------------------------------------------

export default Paginator
