// external imports
import React from 'react'
import { Label, TextField } from 'office-ui-fabric-react'

// internal imports
import styleTextInput from './styleTextInput'
import TextInputProps from '../types/TextInputProps'

// --- renderTextInput ----------------------------------------------

function renderTextInput(props: TextInputProps) {
  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow }

  return (
    styleTextInput(classes =>
      <div data-component="TextInput" className={classes.container} style={style}>
        <Label className={classes.label}>{props.label}</Label>
        <div>
          <TextField/>
        </div>
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

// --- exports ------------------------------------------------------

export default renderTextInput
