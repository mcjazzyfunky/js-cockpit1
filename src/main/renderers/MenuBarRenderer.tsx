import defineRenderer from './defineRenderer'
import { MenuBarModel, MenuModel, ItemModel } from '../api/components/menus/MenuBar'
import React, { ReactNode } from 'react'
import { CommandBar } from 'office-ui-fabric-react'

function render(menuBarModel: MenuBarModel): ReactNode {
  const
    items = menuBarModel.items.map(__convertItemModel, this)

  return <CommandBar items={items}/>
}

function __convertItemModel(menuBarModel: MenuModel) {
  const ret = {
    key: '111',
    name: menuBarModel.text
  }

  return ret
}

export default defineRenderer(render)
