// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DateInputProps from './types/DateInputProps'
import DateInputView from './view/renderDateInput'

// --- DateInput ----------------------------------------------------

const validateDateInput = Spec.checkProps({
  optional: {
    label: Spec.string,
    name: Spec.string,
    id: Spec.string,
    grow: Spec.float
  }
})

const DateInput = component<DateInputProps>({
  displayName: 'DateInput',
  validate: validateDateInput,
  render: DateInputView
})

// --- exports ------------------------------------------------------

export default DateInput
