// external imports
import React from 'react'
import { CommandBar } from 'office-ui-fabric-react'

// internal imports
import MenuBarProps from './MenuBarProps'
import MenuBarItemProps from './MenuBarItemProps'
import MenuBarMenuProps from './MenuBarMenuProps'
import defineStyle from '../../../styling/defineStyle'

// --- style from MenuBar -------------------------------------------

const styleMenuBar = defineStyle(theme => ({
  container: {
  },

  commandBar: {
  },
}))


// --- MenuBarView --------------------------------------------------

function MenuBarView(props: MenuBarProps) {
  let ret = null

  const childCount = React.Children.count(props.children)

  if (childCount > 0) {
    ret = styleMenuBar(classes =>
      <div className={classes.container}>
        <CommandBar
          className={classes.commandBar}
          items={
            React.Children.map(props.children, getItemProps)
          }
        />
      </div>)
  }

  return ret
}

// --- locals -------------------------------------------------------

function getItemProps() {
  let ret = {
    key: '',
    text: 'Juhu'
  }
    
  return ret
}

// --- exports ------------------------------------------------------

export default MenuBarView
