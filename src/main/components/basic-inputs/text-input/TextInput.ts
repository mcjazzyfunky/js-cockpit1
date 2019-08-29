// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import TextInputProps from './types/TextInputProps'
import TextInputView from './view/renderTextInput'

// --- TextInput ----------------------------------------------------

const TextInput = component<TextInputProps>({
  displayName: 'TextInput',

  validate: Spec.checkProps({
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

  render: TextInputView
})

// --- exports ------------------------------------------------------

export default TextInput
