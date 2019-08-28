// external imports
import { component } from 'js-react-utils'

// internal imports
import BrandProps from './types/BrandProps'
import validateBrandProps from './validation/validateBrandProps'
import defaultBrandProps from './defaults/defaultBrandProps'
import BrandView from './view/BrandView'

// --- Brand --------------------------------------------------------

const Brand = component<BrandProps>('Brand')
  .validate(validateBrandProps)
  .defaultProps(defaultBrandProps)
  .render(BrandView)

// --- exports ------------------------------------------------------

export default Brand
