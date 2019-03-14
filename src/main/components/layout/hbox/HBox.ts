// external imports 
import { defineComponent, isNode, withChildren } from 'js-react-utils'

// internal imports
import renderHBox from './view/renderHBox'
import HBoxProps from './types/HBoxProps'

// --- HBox ---------------------------------------------------------

const HBox = defineComponent<HBoxProps>({
  displayName: 'HBox',

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
    return renderHBox(props)
  }
})

// --- exports ------------------------------------------------------

export default HBox
