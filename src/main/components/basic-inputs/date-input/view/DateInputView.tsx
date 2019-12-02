// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { DatePicker, Label } from 'office-ui-fabric-react'

// internal imports
import getDateInputClasses from './getDateInputClasses'
import createUniqueId from '../../../../tools/createUniqueId'
import DateInputViewProps from '../types/DateInputViewProps'

// --- renderDateInput -----------------------------------------------

const DateInputView = component<DateInputViewProps>(
  'DateInputView', props => {

  const
    classes = getDateInputClasses(),

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
})

// --- exports -------------------------------------------------------

export default DateInputView 
