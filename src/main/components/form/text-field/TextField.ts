// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import TextFieldProps from './types/TextFieldProps'
import renderTextField from './view/renderTextField'

// --- TextField ----------------------------------------------------

const TextField = defineComponent<TextFieldProps>({
  displayName: 'TextField',

  properties: {
    label: {
      type: String
    },

    name: {
      type: String
    },

    grow: {
      type: Number
    }
  },

  render(props) {
    return renderTextField(props)
  }
})

// --- exports ------------------------------------------------------

export default TextField
