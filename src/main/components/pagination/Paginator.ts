// internal imports
import PaginatorRenderer from './PaginatorRenderer'
import ActionEvent from '../../events/ActionEvent'

// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- Paginator ----------------------------------------------------

type PaginatorProps = {
  pageIndex: number,
  pageSize: number,
  totalItemCount: number,
  onAction?: (event: ActionEvent<number>) => void 
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

    onAction: {
      type: Function
    }
  },

  render(props: PaginatorProps) {
    return PaginatorRenderer.render(props)
  }
})

// --- helpers ----------------------------------------------------

function getPaginatorData(props: PaginatorProps) {
  return props
}

// --- data models -------------------------------------------------

type PaginatorModel = PaginatorProps

// --- exports ------------------------------------------------------

export default Paginator

export {
  PaginatorModel
}
