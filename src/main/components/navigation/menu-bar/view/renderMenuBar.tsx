// external imports
import React from 'react'
import { CommandBar } from 'office-ui-fabric-react'

// internal imports
import styleMenuBar from './styleMenuBar'
import MenuBarProps from '../types/MenuBarProps'

// --- renderMenuBar ------------------------------------------------

function renderMenuBar(props: MenuBarProps) {
  let ret = null

  const itemCount = props.items.length 

  if (itemCount > 0) {
    ret = styleMenuBar(classes =>
      <div className={classes.container}>
        <CommandBar
          className={classes.commandBar}
          items={getItemProps(props.items, props.onAction)}
        />
      </div>)
  }

  return ret
}

// --- locals -------------------------------------------------------

function getItemProps(items: any, baseOnAction: any) { // TODO
  const ret: any[] = []

  for (let i = 0; i < items.length; ++i) {
    const
      child: any = items[i],

      childOnAction =
        child && child.onAction
          ? child.onAction
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

    let item: any = {
    }

    if (child.type === 'divider') {
      item = {
        text: '-'
      }
    } else {
      item = {
        key: Math.random(),
        text: child.text,
        disabled: !!child.disabled,
        subMenuProps: null as any,
        onClick
      }

      if (child && child.items) {
        item.subMenuProps = {
          items: getItemProps(child.items, baseOnAction),
        }
      }
    }

    ret.push(item)
  }
    
  return ret
}

// --- exports ------------------------------------------------------

export default renderMenuBar