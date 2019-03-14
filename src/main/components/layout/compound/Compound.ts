// external imports 
import { defineComponent, isNode, withChildren } from 'js-react-utils'

// internal imports
import renderCompound from './view/renderCompound'
import CompoundProps from './types/CompoundProps'

// --- Compound -----------------------------------------------------

const Compound = defineComponent<CompoundProps>({
  displayName: 'Compound',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(isNode)
    }
  },

  render(props) {
    return renderCompound(props)
  }
})

// --- exports ------------------------------------------------------

export default Compound
