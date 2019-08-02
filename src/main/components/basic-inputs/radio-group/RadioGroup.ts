// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import RadioGroupProps from './types/RadioGroupProps'
import renderRadioGroup from './view/renderRadioGroup'

// --- RadioGroup ---------------------------------------------------

const RadioGroup = defineComponent<RadioGroupProps>({
  displayName: 'RadioGroup',

  validate: Spec.checkProps({
    required: {
      options: Spec.arrayOf(
        Spec.exact({
          key: Spec.string,
          text: Spec.string
        }))
    },

    optional: {
      label: Spec.string,
      name: Spec.string,
      defaultSelectedKey: Spec.string,
      orientation: Spec.string,
      grow: Spec.number
    }
  }),

  defaultProps: {
    orientation: 'vertical'
  },

  render(props) {
    return renderRadioGroup(props)
  }
})

// --- exports ------------------------------------------------------

export default RadioGroup 
