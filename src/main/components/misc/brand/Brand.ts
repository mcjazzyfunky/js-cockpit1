// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import BrandProps from './types/BrandProps'
import renderBrand from './view/renderBrand'

// --- Brand --------------------------------------------------------

const Brand = defineComponent<BrandProps>({
  displayName: 'Brand',

  properties: {
    logo: {
      nullable: true,
      validate: isNode,
    },

    vendor: {
      type: String
    },

    title: {
      type: String
    },

    size: {
      type: String,
      validate: Spec.oneOf('medium', 'large', 'huge'),
      defaultValue: 'medium'
    },

    className: {
      type: String
    },

    style: {
      type: Object,
    }
  },

  render(props) {
    return renderBrand(props)
  }
})

// --- exports ------------------------------------------------------

export default Brand
