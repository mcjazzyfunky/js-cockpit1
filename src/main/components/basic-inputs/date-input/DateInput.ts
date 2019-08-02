// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DateInputProps from './types/DateInputProps'
import renderDateInput from './view/renderDateInput'

// --- DateInput ----------------------------------------------------

const DateInput = defineComponent<DateInputProps>({
  displayName: 'DateInput',
  
  validate: Spec.checkProps({
    optional: {
      label: Spec.string,
      name: Spec.string,
      id: Spec.string,
      grow: Spec.float
    }
  }),

  render(props) {
    return renderDateInput(props)
  }
})

// --- exports ------------------------------------------------------

export default DateInput
