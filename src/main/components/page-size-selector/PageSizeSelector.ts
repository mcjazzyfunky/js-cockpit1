// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import { PAGE_SIZE_OPTIONS } from './constants'
import PageSizeSelectorProps from './PageSizeSelectorProps'
import PageSizeSelectorView from './PageSizeSelectorView'

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

  render(props: PageSizeSelectorProps) {
    return PageSizeSelectorView(props)
  }
})

// --- exports ------------------------------------------------------

export default PageSizeSelector
