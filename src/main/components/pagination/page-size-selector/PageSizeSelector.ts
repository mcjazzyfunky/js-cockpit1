// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import { PAGE_SIZE_OPTIONS } from '../misc/constants'
import PageSizeSelectorProps from './types/PageSizeSelectorProps'
import renderPageSizeSelector from './view/renderPageSizeSelector'

// --- PageSizeSelector ---------------------------------------------

const PageSizeSelector = defineComponent<PageSizeSelectorProps>({
  displayName: 'PageSizeSelector',

  properties: {
    pageSize: {
      type: Number,
      required: true,
      validate: Spec.in(PAGE_SIZE_OPTIONS)
    },

    onPageSizeChange: {
      type: Function 
    }
  },

  render(props) {
    return renderPageSizeSelector(props)
  }
})

// --- exports ------------------------------------------------------

export default PageSizeSelector
