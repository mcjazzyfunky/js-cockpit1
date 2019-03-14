// external imports
import React, { ReactElement } from 'react'
import { TextField } from 'office-ui-fabric-react'

// internal imports
import styleTextField from './styleTextField'
import TextFieldProps from '../types/TextFieldProps'

// --- renderTextField ------------------------------------------------

function renderTextField(props: TextFieldProps) {
  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow }

  return (
    styleTextField(classes =>
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

export default renderTextField
