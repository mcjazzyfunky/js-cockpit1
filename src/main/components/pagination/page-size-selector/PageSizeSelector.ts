// external imports
import { component } from 'js-react-utils'

// internal imports
import PageSizeSelectorProps from './types/PageSizeSelectorProps'
import PageSizeSelectorView from './view/PageSizeSelectorView'
import validatePageSizeSelectorProps from './validate/validatePageSizeSelectorProps'

// --- PageSizeSelector ----------------------------------------------

const PageSizeSelector = component<PageSizeSelectorProps>({
  displayName: 'PageSizeSelector',
  validate: validatePageSizeSelectorProps,
  render: PageSizeSelectorView
})

// --- exports -------------------------------------------------------

export default PageSizeSelector
