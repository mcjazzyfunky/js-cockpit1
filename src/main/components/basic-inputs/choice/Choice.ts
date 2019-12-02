// external imports
import { component } from 'js-react-utils'

// internal imports
import ChoiceProps from './types/ChoiceProps'
import ChoiceView from './view/ChoiceView'
import validateChoiceProps from './validation/validateChoiceProps'

// --- Choice --------------------------------------------------------

const Choice = component<ChoiceProps>({
  displayName: 'Choice',
  validate: validateChoiceProps,
  render: ChoiceView
})

// --- exports -------------------------------------------------------

export default Choice
