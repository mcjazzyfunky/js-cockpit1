// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import CheckGroupProps from './types/CheckGroupProps'
import renderCheckGroup from './view/renderCheckGroup'

// --- CheckGroup ---------------------------------------------------

const CheckGroup = defineComponent<CheckGroupProps>({
  displayName: 'CheckGroup',

  properties: {
    label: {
      type: String
    },

    name: {
      type: String
    },

    orientation: {
      type: String
    },

    grow: {
      type: Number
    },

    options: {
      type: Array
    }
  },

  render(props) {
    return renderCheckGroup(props)
  }
})

// --- exports ------------------------------------------------------

export default CheckGroup 
