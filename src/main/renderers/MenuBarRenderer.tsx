import { MenuBarModel, MenuModel, ItemModel } from '../api/components/menus/MenuBar'
import React, { ReactNode } from 'react'
import { CommandBar } from 'office-ui-fabric-react'

export default class MenuBarRenderer {
  render(menuBarModel: MenuBarModel): ReactNode {
    console.log(menuBarModel)

    const
      items = menuBarModel.items.map(this.__convertMenuModel, this)

    return <CommandBar items={items}/>
  }

  private __convertMenuModel(menuBarModel: MenuModel) {
    const ret = {
      key: '111',
      name: menuBarModel.text
    }

    return ret
  }
}