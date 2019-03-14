// external imports
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderVBox from './view/renderVBox'
import VBoxProps from './types/VBoxProps'

// --- VBox ---------------------------------------------------------

const VBox = defineComponent<VBoxProps>({
  displayName: 'VBox',

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
    return renderVBox(props)
  }
})

// --- exports ------------------------------------------------------

export default VBox 
