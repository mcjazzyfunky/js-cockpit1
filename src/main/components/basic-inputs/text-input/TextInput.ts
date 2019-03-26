// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import TextInputProps from './types/TextInputProps'
import renderTextInput from './view/renderTextInput'

// --- TextInput ----------------------------------------------------

const TextInput = defineComponent<TextInputProps>({
  displayName: 'TextInput',

  validate: Spec.exactProps({
    optional: {
      label: Spec.string,
      name: Spec.string,
      value: Spec.string, 
      disabled: Spec.or(Spec.boolean, Spec.function),
      errorMessage: Spec.string,
      id: Spec.string,
      grow: Spec.float
    }
  }),

  render(props) {
    return renderTextInput(props)
  }
})

// --- exports ------------------------------------------------------

export default TextInput
