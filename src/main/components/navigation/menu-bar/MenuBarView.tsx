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
          items={getItemProps(props.children)}
        />
      </div>)
  }

  return ret
}

// --- locals -------------------------------------------------------

function getItemProps(children: any) { // TODO
  const ret: any[] = []

  React.Children.forEach(children, (child: any) => { // TODO
    const item = {
      key: Math.random(),
      text: child.props.text,
      subMenuProps: null as any
    }

    if (child.props && child.props.children) {
      item.subMenuProps = {
        items: getItemProps(child.props.children)
      }
    }

    ret.push(item)
  })
    
  return ret
}

// --- exports ------------------------------------------------------

export default MenuBarView
