// external imports
import React from 'react'
import { Label, TextField } from 'office-ui-fabric-react'

// internal imports
import styleTextInput from './styleTextInput'
import TextInputProps from '../types/TextInputProps'
import createUniqueId from '../../../../tools/createUniqueId'

// --- renderTextInput ----------------------------------------------

function renderTextInput(props: TextInputProps) {
  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow },

    textFieldProps: any = {},
    labelProps: any = {},
    id = props.id || createUniqueId()

  textFieldProps.id = id
  labelProps.htmlFor = id

  return (
    styleTextInput(classes =>
      <div data-component="TextInput" className={classes.container} style={style}>
        {
          props.label
            ? <Label {...labelProps} className={classes.label}>{props.label}</Label>
            : null
        }
        <div>
          <TextField {...textFieldProps}/>
        </div>
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

// --- exports ------------------------------------------------------

export default renderTextInput
