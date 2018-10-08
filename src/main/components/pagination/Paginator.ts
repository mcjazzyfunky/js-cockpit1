// internal imports
import PaginatorRenderer from './PaginatorRenderer'
import PageChangeEvent from '../../events/PageChangeEvent'

// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- Paginator ----------------------------------------------------

type PaginatorProps = {
  pageIndex: number,
  pageSize: number,
  totalItemCount: number,
  onPageChange?: (event: PageChangeEvent) => void 
}

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
    return PaginatorRenderer.render(getPaginatorModel(props))
  }
})

// --- helpers ----------------------------------------------------

function getPaginatorModel(props: PaginatorProps): PaginatorModel {
  return {
    $kind: 'PaginatorModel',
    pageIndex: props.pageIndex,
    pageSize: props.pageSize,
    totalItemCount: props.totalItemCount,

    api: {
      changePage: (pageIndex: number) => {
        if (props.onPageChange) {
          props.onPageChange({
            type:'changePage',
            pageIndex
          })
        }
      }
    }
  }
}

// --- data models -------------------------------------------------

type PaginatorModel = {
  $kind: 'PaginatorModel',
  pageIndex: number,
  pageSize: number,
  totalItemCount: number,

  api: {
    changePage: (pageIndex: number) => void
  }
} 

// --- exports ------------------------------------------------------

export default Paginator

export {
  PaginatorModel
}
