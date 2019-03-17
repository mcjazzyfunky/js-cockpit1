// external imports
import React from 'react'
import { DatePicker, Label } from 'office-ui-fabric-react'

// internal imports
import styleTextInput from './styleDateInput'
import DateInputProps from '../types/DateInputProps'

// --- renderDateInput ----------------------------------------------

function renderDateInput(props: DateInputProps) {
  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow }

  return (
    styleTextInput(classes =>
      <div data-component="DateInput" className={classes.container} style={style}>
        {
          props.label
            ? <Label className={classes.label}>{props.label}</Label>
            : null
        }
        <div>
          <DatePicker/>
        </div>
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

// --- exports ------------------------------------------------------

export default renderDateInput
