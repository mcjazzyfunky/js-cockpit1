// external imports
import React, { ReactElement } from 'react'
import { TextField } from 'office-ui-fabric-react'

// internal imports
import styleTextInput from './styleTextInput'
import TextInputProps from '../types/TextInputProps'

// --- renderTextField ------------------------------------------------

function renderTextInput(props: TextInputProps) {
  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow }

  return (
    styleTextInput(classes =>
      <div data-component="TextField" className={classes.container} style={style}>
        <div className={classes.label}>{props.label}</div>
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
