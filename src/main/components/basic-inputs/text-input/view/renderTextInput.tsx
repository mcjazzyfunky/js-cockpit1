// external imports
import React from 'react'
import { Label, TextField } from 'office-ui-fabric-react'

// internal imports
import styleTextInput from './styleTextInput'
import TextInputProps from '../types/TextInputProps'
import createUniqueId from '../../../../tools/createUniqueId'
import FormCtrlCtx from '../../../../contexts/form-ctx/FormCtrlCtx'

// derived imports
const { useContext } = React

// --- renderTextInput ----------------------------------------------

function renderTextInput(props: TextInputProps) {
  const
    ctrl = useContext(FormCtrlCtx),
  
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow },

    textFieldProps: any = {},
    labelProps: any = {},
    id = props.id || createUniqueId()

  textFieldProps.id = id
  labelProps.htmlFor = id

  if (props.name && ctrl !== null) {
    textFieldProps.onChange = (event: any) => {
      ctrl.setTempValue(props.name!, event.target.value) 
    }
    
    textFieldProps.onBlur = (event: any) => {
      ctrl.setValue(props.name!, event.target.value) 
    }

    textFieldProps.onKeyDown = (event: any) => {
      if (event.charCode === 13) {
        ctrl.setValue(props.name!, event.target.value) 
      }
    }
  }

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
