// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { Dropdown, Label } from 'office-ui-fabric-react'

// internal imports
import getChoiceClasses from './getChoiceClasses'
import ChoiceViewProps from '../types/ChoiceViewProps'
import createUniqueId from '../../../../tools/createUniqueId'

// --- ChoiceView ----------------------------------------------------

const ChoiceView = component<ChoiceViewProps>(
  'ChoiceView', props => {

  const
    classes = getChoiceClasses(),

    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow },

    dropdownProps: any = {},
    labelProps: any = {},
    id = props.id || createUniqueId()
  
  dropdownProps.id = id
  labelProps.htmlFor = id

  return (
    <div data-component="Choice" className={classes.container} style={style}>
      {
        props.label
          ? <Label {...labelProps} className={classes.label}>{props.label}</Label>
          : null
      }
      <Dropdown {...dropdownProps} options={props.options as any}/> 
    </div>
  )
})

// --- exports -------------------------------------------------------

export default ChoiceView
