// external imports
import { component, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import BrandProps from './types/BrandProps'
import renderBrand from './view/renderBrand'

// --- Brand --------------------------------------------------------

const Brand = component<BrandProps>('Brand')
  .validate(
    Spec.checkProps({
      required: {
      },

      optional: {
        vender: Spec.string,
        title: Spec.string,
        logo: isNode,
        size: Spec.oneOf('medium', 'large', 'huge'),
        className: Spec.string,
        style: Spec.object
      }
    })
  )
  .defaultProps({
    size: 'medium'
  })
  .render(props => renderBrand(props))

// --- exports ------------------------------------------------------

export default Brand
