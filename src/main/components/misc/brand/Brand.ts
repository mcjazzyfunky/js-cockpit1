// external imports
import { component, withDefaultProps } from 'js-react-utils'

// internal imports
import BrandProps from './types/BrandProps'
import BrandView from './view/BrandView'
import validateBrandProps from './validation/validateBrandProps'
import defaultBrandProps from './defaults/defaultBrandProps'

// --- Brand ---------------------------------------------------------

const Brand = component<BrandProps>({
  displayName: 'Brand',
  validate: validateBrandProps,
  render: withDefaultProps(defaultBrandProps, BrandView)
})

// --- exports -------------------------------------------------------

export default Brand
