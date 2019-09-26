// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { ChoiceGroup, Label } from 'office-ui-fabric-react'

// internal imports
import getRadioGroupClasses from './getRadioGroupClasses'
import RadioGroupViewProps from '../types/RadioGroupViewProps'

// --- RadioGroupView -----------------------------------------------

const ViewRadioGroup = component<RadioGroupViewProps>(
  'RadioGroupView', props => {

  const
    classes = getRadioGroupClasses(),

    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow }

  const choiceGroupClassName =
    props.orientation === 'horizontal'
      ? classes.vertical
      : undefined

  return (
    <div data-component="RadioGroup" className={classes.container} style={style}>
      {
        props.label
          ? <Label className={classes.label}>{props.label}</Label>
          : null
      }
      <div>
        <ChoiceGroup
          options={props.options}
          defaultSelectedKey={props.defaultSelectedKey}
          className={choiceGroupClassName}
        /> 
      </div>
    </div>
  )
})

// --- exports ------------------------------------------------------

export default ViewRadioGroup
