// external imports
import { component } from 'js-react-utils'

// internal imports
import DateInputProps from './types/DateInputProps'
import DateInputView from './view/DateInputView'
import validateDateInputProps from './validation/validateDataInputProps'

// --- DateInput -----------------------------------------------------

const DateInput = component<DateInputProps>({
  displayName: 'DateInput',
  validate: validateDateInputProps,
  render: DateInputView
})

// --- exports -------------------------------------------------------

export default DateInput
