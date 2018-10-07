import defineRenderer from '../defineRenderer'
import { MenuBarModel, MenuModel, ItemModel } from '../../api/components/menus/MenuBar'
import React, { ReactNode } from 'react'
import { CommandBar } from 'office-ui-fabric-react'

function render(menuBarModel: MenuBarModel): ReactNode {
  const
    items = menuBarModel.items.map(__convertItemModel, this)

  return <CommandBar items={items}/>
}

function __convertItemModel(itemModel: ItemModel | MenuModel): { key: string, name: string, subMenuProps?: any} {
  return (
    itemModel.kind === 'item'
      ? { key: itemModel.name, name: itemModel.text }
      : { key: 'itemModel.name', name:itemModel.text, subMenuProps: { items: itemModel.items.map(__convertItemModel)  }}
  )
}

export default defineRenderer(render)
