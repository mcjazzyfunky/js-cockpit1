import React from 'react'
import defineRenderer from '../defineRenderer'
import { Model_AppsWithMenu, Model_AppsWithMenu_Menu, Model_AppsWithMenu_Item } from '../../api/components/misc/AppsWithMenu'
import { CommandBar } from 'office-ui-fabric-react'

export default defineRenderer((model: Model_AppsWithMenu) => {
  let ret = null

  if (model.menu.length > 0) {
    ret =
      <CommandBar
        items={
          model.menu.map(getItemProps)
        }
      />
  }

  return ret
})

// --- helpers ------------------------------------------------------

function getItemProps(model: Model_AppsWithMenu_Menu | Model_AppsWithMenu_Item) {
  const ret: any = { // TODO
    key: model.name,
    name: model.title,
  }

  if (model.kind === 'Model_AppsWithMenu_Menu') {
    const menu = model as Model_AppsWithMenu_Menu

    if (menu.items.length > 0) {
      ret.subMenuProps = {
        items: menu.items.map(it => {
          return getItemProps(it)
        })
      }
    }
  } else if (model.kind === 'Model_AppsWithMenu_Item') {

  } else {
    throw new Error('This should never happen')
  }

  return ret
}
