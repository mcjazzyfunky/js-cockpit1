// external imports
import { component } from 'js-react-utils'

// internal imports
import BrandProps from './types/BrandProps'
import validateBrandProps from './validation/validateBrandProps'
import BrandView from './view/BrandView'

// --- Brand --------------------------------------------------------

const Brand = component<BrandProps>({
  displayName: 'Brand',
  validate: validateBrandProps,
  render: BrandView
})

// --- exports ------------------------------------------------------

export default Brand
