// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DateInputProps from './types/DateInputProps'
import renderDateInput from './view/renderDateInput'

// --- DateInput ----------------------------------------------------

const DateInput = defineComponent<DateInputProps>({
  displayName: 'DateInput',

  properties: {
    label: {
      type: String
    },

    name: {
      type: String
    },

    grow: {
      type: Number
    }
  },

  render(props) {
    return renderDateInput(props)
  }
})

// --- exports ------------------------------------------------------

export default DateInput
