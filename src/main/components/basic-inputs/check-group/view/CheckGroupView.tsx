// external imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'
import { Checkbox, Label } from 'office-ui-fabric-react'

// internal imports
import getCheckGroupClasses from './getCheckGroupClasses'
import CheckGroupViewProps from '../types/CheckGroupViewProps'

// --- CheckGroupView ------------------------------------------------

const CheckGroupView = component<CheckGroupViewProps>(
  'CheckGroupView', props => {

  const
    classes = getCheckGroupClasses(),
  
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow },

    checkBoxes: ReactNode[] = []

  if (props.options) {
    props.options.forEach(option => {
      const checked =
        props.selectedKeys && props.selectedKeys.includes(option.key) 

      checkBoxes.push(
        <div className={classes.option}>
          <Checkbox key={option.key} label={option.text} checked={checked}/>
        </div>
      )
    })
  }

  return (
    <div data-component="CheckGroup" className={classes.container} style={style}>
      {
        props.label
          ? <Label className={classes.label}>{props.label}</Label>
          : null
      }
      <div>
        {...checkBoxes}
      </div>
    </div>
  )
})

// --- locals --------------------------------------------------------

// --- exports -------------------------------------------------------

export default CheckGroupView
