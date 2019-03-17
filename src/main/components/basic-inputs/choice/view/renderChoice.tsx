// external imports
import React, { ReactElement } from 'react'
import { Dropdown } from 'office-ui-fabric-react'

// internal imports
import styleChoice from './styleChoice'
import ChoiceProps from '../types/ChoiceProps'

// --- renderTextField ------------------------------------------------

function renderChoice(props: ChoiceProps) {
  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow }

  return (
    styleChoice(classes =>
      <div data-component="Choice" className={classes.container} style={style}>
        {
          props.label
            ? <Dropdown label={props.label} options={props.options as any}/> 
            : <Dropdown options={props.options as any}/> 
        }
      </div>
    )
  )
}

// --- locals -------------------------------------------------------

// --- exports ------------------------------------------------------

export default renderChoice
