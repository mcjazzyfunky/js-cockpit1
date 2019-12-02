// external imports
import { component } from 'js-react-utils'

// internal imports
import TextInputProps from './types/TextInputProps'
import TextInputView from './view/TextInputView'
import validateTextInputProps from './validation/validateTextInputProps'

// --- TextInput -----------------------------------------------------

const TextInput = component<TextInputProps>({
  displayName: 'TextInput',
  validate: validateTextInputProps,
  render: TextInputView
})

// --- exports -------------------------------------------------------

export default TextInput
