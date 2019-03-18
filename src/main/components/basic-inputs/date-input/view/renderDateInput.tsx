// external imports
import React from 'react'
import { DatePicker, Label } from 'office-ui-fabric-react'

// internal imports
import styleTextInput from './styleDateInput'
import DateInputProps from '../types/DateInputProps'
import createUniqueId from '../../../../tools/createUniqueId'

// --- renderDateInput ----------------------------------------------

function renderDateInput(props: DateInputProps) {
  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow },

    datePickerProps: any = {},
    labelProps: any = {},
    id = props.id || createUniqueId()
  
  datePickerProps.id = id
  labelProps.htmlFor = id + '-label'

  return (
    styleTextInput(classes =>
      <div data-component="DateInput" className={classes.container} style={style}>
        {
          props.label
            ? <Label {...labelProps} className={classes.label}>{props.label}</Label>
            : null
        }
        <div>
          <DatePicker {...datePickerProps}/>
        </div>
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

// --- exports ------------------------------------------------------

export default renderDateInput
