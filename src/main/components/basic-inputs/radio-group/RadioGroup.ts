// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import RadioGroupProps from './types/RadioGroupProps'
import RadioGroupView from './view/ViewRadioGroup'

// --- RadioGroup ---------------------------------------------------

const RadioGroup = component<RadioGroupProps>({
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

  render: RadioGroupView
})

// --- exports ------------------------------------------------------

export default RadioGroup 
