// external imports
import { component } from 'js-react-utils'

// internal imports
import RadioGroupProps from './types/RadioGroupProps'
import RadioGroupView from './view/RadioGroupView'
import validateRadioGroupProps from './validation/validateRadioGroupProps'

// --- RadioGroup ----------------------------------------------------

const RadioGroup = component<RadioGroupProps>({
  displayName: 'RadioGroup',
  validate: validateRadioGroupProps,
  render: RadioGroupView
})

// --- exports -------------------------------------------------------

export default RadioGroup 
