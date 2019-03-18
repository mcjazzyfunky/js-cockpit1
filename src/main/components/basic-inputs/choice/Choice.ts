// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import ChoiceProps from './types/ChoiceProps'
import renderChoice from './view/renderChoice'

// --- Choice -------------------------------------------------------

const Choice = defineComponent<ChoiceProps>({
  displayName: 'TextInput',

  properties: {
    label: {
      type: String
    },

    name: {
      type: String
    },

    id: {
      type: String
    },

    grow: {
      type: Number
    },

    options: {
      type: Array,
      validate: Spec.arrayOf(Spec.string)
    }
  },

  render(props) {
    return renderChoice(props)
  }
})

// --- exports ------------------------------------------------------

export default Choice
