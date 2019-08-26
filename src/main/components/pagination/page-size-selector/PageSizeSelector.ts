// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import { PAGE_SIZE_OPTIONS } from '../misc/constants'
import PageSizeSelectorProps from './types/PageSizeSelectorProps'
import renderPageSizeSelector from './view/renderPageSizeSelector'

// --- PageSizeSelector ---------------------------------------------

const PageSizeSelector = component<PageSizeSelectorProps>('PageSizeSelector')
  .validate(
    Spec.checkProps({
      required: {
        pageSize: Spec.in(PAGE_SIZE_OPTIONS)
      },

      optional: {
        onPageSizeChange: Spec.function
      }
    })
  )
  .render(renderPageSizeSelector)

// --- exports ------------------------------------------------------

export default PageSizeSelector
