// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import RadioGroupProps from './types/RadioGroupProps'
import renderRadioGroup from './view/renderRadioGroup'

// --- RadioGroup ---------------------------------------------------

const RadioGroup = component<RadioGroupProps>('RadioGroup')
  .validate(
    Spec.checkProps({
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
    })
  )
  .defaultProps({
    orientation: 'vertical'
  })
  .render(props => renderRadioGroup(props))

// --- exports ------------------------------------------------------

export default RadioGroup 
