// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import ChoiceProps from './types/ChoiceProps'
import renderChoice from './view/renderChoice'

// --- Choice -------------------------------------------------------

const Choice = component<ChoiceProps>('TextInput')
  .validate(
    Spec.checkProps({
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
  )
  .render(props => renderChoice(props))

// --- exports ------------------------------------------------------

export default Choice
