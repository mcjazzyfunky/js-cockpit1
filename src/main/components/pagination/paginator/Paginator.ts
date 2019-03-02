// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import PaginatorProps from './types/PaginatorProps'
import PaginatorView from './view/renderPaginator'

// --- Paginator ----------------------------------------------------

const Paginator = defineComponent<PaginatorProps>({
  displayName: 'Paginator',

  properties: {
    pageIndex: {
      type: Number,
      validate: Spec.nonnegativeInteger,
      required: true
    },

    pageSize: {
      type: Number,
      validate: Spec.positiveInteger,
      required: true
    },

    totalItemCount: {
      type: Number,
      validate: Spec.nonnegativeInteger,
      required: true
    },

    onPageChange: {
      type: Function
    }
  },

  render(props: PaginatorProps) {
    return PaginatorView(props) 
  }
})

// --- exports ------------------------------------------------------

export default Paginator
