// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DateInputProps from './types/DateInputProps'
import renderDateInput from './view/renderDateInput'

// --- DateInput ----------------------------------------------------

const DateInput = component<DateInputProps>('DateInput')
  .validate(
    Spec.checkProps({
      optional: {
        label: Spec.string,
        name: Spec.string,
        id: Spec.string,
        grow: Spec.float
      }
    })
  )
  .render(props => renderDateInput(props))

// --- exports ------------------------------------------------------

export default DateInput
