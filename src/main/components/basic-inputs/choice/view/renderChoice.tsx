// external imports
import React, { ReactElement } from 'react'
import { Dropdown, Label } from 'office-ui-fabric-react'

// internal imports
import styleChoice from './styleChoice'
import ChoiceProps from '../types/ChoiceProps'
import createUniqueId from '../../../../tools/createUniqueId'

// --- renderTextField ------------------------------------------------

function renderChoice(props: ChoiceProps) {
  const
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
    styleChoice(classes =>
      <div data-component="Choice" className={classes.container} style={style}>
        {
          props.label
            ? <Label {...labelProps} className={classes.label}>{props.label}</Label>
            : null
        }
        <Dropdown {...dropdownProps} options={props.options as any}/> 
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

// --- exports ------------------------------------------------------

export default renderChoice
