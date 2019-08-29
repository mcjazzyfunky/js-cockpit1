// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import ChoiceProps from './types/ChoiceProps'
import ChoiceView from './view/renderChoice'

// --- Choice -------------------------------------------------------

const validateChoice = Spec.checkProps({
  required: {
    options: 
      Spec.arrayOf(
        Spec.exact({
          key: Spec.string,
          text: Spec.string
        }))
  },

  optional: {
    label: Spec.string,
    name: Spec.string,
    id: Spec.string,
    grow: Spec.float,
  }
})

const Choice = component<ChoiceProps>({
  displayName: 'TextInput',
  validate: validateChoice,
  render: ChoiceView
})

// --- exports ------------------------------------------------------

export default Choice
