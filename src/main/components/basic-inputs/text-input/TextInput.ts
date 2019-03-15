// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import TextInputProps from './types/TextInputProps'
import renderTextInput from './view/renderTextInput'

// --- TextInput ----------------------------------------------------

const TextInput = defineComponent<TextInputProps>({
  displayName: 'TextInput',

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
    return renderTextInput(props)
  }
})

// --- exports ------------------------------------------------------

export default TextInput
