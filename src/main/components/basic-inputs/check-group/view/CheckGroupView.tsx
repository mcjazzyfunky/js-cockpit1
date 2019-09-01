// external imports
import React, { ReactNode } from 'react'
import { component } from 'js-react-utils'
import { Checkbox, Label } from 'office-ui-fabric-react'

// internal imports
import CheckGroupViewProps from '../types/CheckGroupViewProps'
import styleCheckGroup from './styleCheckGroup'

// --- CheckGroupView -----------------------------------------------

const CheckGroupView = component<CheckGroupViewProps>(
  'CheckGroupView', props => {

  const
    style =
      props.grow === undefined
        ? undefined
        : { flexGrow: props.grow },

    checkBoxes: ReactNode[] = []

  return styleCheckGroup(classes => {
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
})

// --- locals -------------------------------------------------------

// --- exports ------------------------------------------------------

export default CheckGroupView
