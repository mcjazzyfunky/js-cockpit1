// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { Label, TextField } from 'office-ui-fabric-react'

// internal imports
import TextInputViewProps from '../types/TextInputViewProps'
import FormCtrlCtx from '../../../../contexts/form-ctx/FormCtrlCtx'
import getTextInputClasses from './getTextInputClasses'
import createUniqueId from '../../../../tools/createUniqueId'

// derived imports
const { useContext } = React

// --- TextInputView -------------------------------------------------

const TextInputView = component<TextInputViewProps>(
  'TextInputView', props => {

  const
    classes = getTextInputClasses(),
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

  if (!props.name || !ctrl) {
    if (props.hasOwnProperty('value')) {
      textFieldProps.value = props.value
    }
    
    if (props.hasOwnProperty('disabled')) {
      textFieldProps.value = props.disabled
    }
    
    if (props.hasOwnProperty('errorMessage')) {
      textFieldProps.value = props.errorMessage
    }
  } else {
    if (props.hasOwnProperty('value')) {
      textFieldProps.value = props.value
    } else {
      const value = ctrl.getTempValue(props.name)

      if (typeof value === 'string') {
        textFieldProps.value = value
      }
    }

    if (props.hasOwnProperty('disabled')) {
      let disabled = props.disabled

      if (typeof disabled === 'function') {
        disabled = disabled(ctrl.getValues(), ctrl.getTempValues())
      }

      disabled = disabled === true
      textFieldProps.disabled = disabled
    }

    textFieldProps.onChange = (event: any) => {
      ctrl.setTempValue(props.name!, event.target.value) 
    }
    
    textFieldProps.onBlur = (event: any) => {
      ctrl.setValue(props.name!, event.target.value) 
    }

    textFieldProps.onKeyDown = (event: any) => {
      if (event.keyCode === 13) {
        ctrl.setValue(props.name!, event.target.value) 
      }
    }
  }

  return (
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
})

// --- exports -------------------------------------------------------

export default TextInputView
