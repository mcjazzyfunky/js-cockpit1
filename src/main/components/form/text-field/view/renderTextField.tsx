// external imports
import React, { ReactElement } from 'react'
import { TextField } from 'office-ui-fabric-react'

// internal imports
import styleTextField from './styleTextField'
import TextFieldProps from '../types/TextFieldProps'

// --- renderTextField ------------------------------------------------

function renderTextField(props: TextFieldProps) {
  return (
    styleTextField(classes =>
      <div className={classes.container}>
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
