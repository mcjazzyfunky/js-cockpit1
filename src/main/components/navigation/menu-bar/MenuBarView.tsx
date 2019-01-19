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
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternaryAlt,
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
          items={getItemProps(props.children, props.onAction)}
        />
      </div>)
  }

  return ret
}

// --- locals -------------------------------------------------------

function getItemProps(children: any, baseOnAction: any) { // TODO
  const ret: any[] = []

  React.Children.forEach(children, (child: any) => { // TODO
    const childOnAction =
      child.props && child.props.onAction
        ? child.props.onAction
        : null

    let onClick: any = null

    if (childOnAction) {
      if (!baseOnAction) {
        onClick = () => childOnAction()
      } else {
        onClick = () => {
          childOnAction()
          baseOnAction()
        }
      }
    } else if (baseOnAction) {
      onClick = () => baseOnAction()
    }

    const item = {
      key: Math.random(),
      text: child.props.text,
      disabled: !!child.props.disabled,
      subMenuProps: null as any,
      onClick
    }

    if (child.props && child.props.children) {
      item.subMenuProps = {
        items: getItemProps(child.props.children, baseOnAction),
      }
    }

    ret.push(item)
  })
    
  return ret
}

// --- exports ------------------------------------------------------

export default MenuBarView
