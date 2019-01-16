// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import BrandProps from './BrandProps'
import BrandView from './BrandView'

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
      validate: Spec.oneOf('medium', 'large'),
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
    return BrandView(props)
  }
})

// --- exports ------------------------------------------------------

export default Brand
