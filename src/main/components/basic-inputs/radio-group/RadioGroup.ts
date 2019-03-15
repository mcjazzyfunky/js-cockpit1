// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import RadioGroupProps from './types/RadioGroupProps'
import renderRadioGroup from './view/renderRadioGroup'

// --- RadioGroup ---------------------------------------------------

const RadioGroup = defineComponent<RadioGroupProps>({
  displayName: 'RadioGroup',

  properties: {
    label: {
      type: String
    },

    name: {
      type: String
    },

    orientation: {
      type: String,
      defaultValue: 'vertical',
      validate: Spec.oneOf('horizontal', 'vertical')
    },

    grow: {
      type: Number
    },

    options: {
      type: Array
    }
  },

  render(props) {
    return renderRadioGroup(props)
  }
})

// --- exports ------------------------------------------------------

export default RadioGroup 
