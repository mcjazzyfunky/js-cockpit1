import ActionEvent from '../../events/ActionEvent'
import MenuBarRenderer from '../../../renderers/MenuBarRenderer'
import React, { ComponentType, ReactNode, ReactElement } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- MenuBar.Item -------------------------------------------------

type ItemProps = {
  text: string,
  name: string,
  disabled?: boolean,
  onAction?: (event: ActionEvent) => void
}

const Item = defineComponent<ItemProps>({
  displayName: 'MenuBar.Item',

  properties: {
    text: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    disabled: {
      type: Boolean
    },

    onAction: {
      type: Function
    }
  },

  render() {
    throw new Error(
      'Components of type MenuBar.Item must be children of MenuBar.Menu '
        + 'components')
  }
})

// --- MenuBar.Menu -------------------------------------------------

type MenuProps = {
  text: string,
  children?: ReactNode
}

const Menu: ComponentType<MenuProps> = defineComponent<MenuProps>({
  displayName: 'MenuBar.Menu',

  properties: {
    text: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() =>
            Spec.all(isElementOfType([Item, Menu]))))
    }
  },

  render() {
    throw new Error(
      'Components of type MenuBar.Item must be children of MenuBar.Menu '
        + 'components')
  }
})

// --- MenuBar ------------------------------------------------------

type MenuBarProps = {
  children?: ReactNode,
  onAction?: (event: ActionEvent) => void
}

const MenuBar = defineComponent<MenuBarProps>({
  displayName: 'MenuBar',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Menu, Item])))
    },
  
    onAction: {
      type: Function
    }
  },

  base: class extends React.Component<MenuBarProps> {
    private __menuBarModel: MenuBarModel
    private __menuBarModelSource: MenuBarProps

    constructor(props: MenuBarProps) {
      super(props)
      this.__menuBarModel = null
      this.__menuBarModelSource = null
    }

    render() {
      this.__prepareMenuBarModel()

      return MenuBarRenderer.render(this.__menuBarModel)
    }

    private __prepareMenuBarModel() {
      if (this.props !== this.__menuBarModelSource) {
        this.__menuBarModel = getMenuBarModel(this.props)
        this.__menuBarModelSource = this.props
      }
    }
  }
})

export default Object.assign(MenuBar, {
  Menu,
  Item
})

// --- models -------------------------------------------------------

export type MenuBarModel = {
  items: (ItemModel | MenuModel)[],
  onAction: (event: ActionEvent) => void | null
}

export type MenuModel = {
  kind: 'menu',
  text: string,
  items: ((MenuModel | ItemModel)[]) | null
}

export type ItemModel = {
  kind: 'item',
  text: string,
  name: string | null,
  disabled: boolean,
  onAction: ((event: ActionEvent) => void) | null
}

// --- helpers ------------------------------------------------------

function getMenuBarModel(props: MenuBarProps): MenuBarModel {
  const items: (ItemModel | MenuModel)[] =
    React.Children.map(props.children, (child: ReactElement<ItemProps | MenuProps>) =>
      child.type === Item
        ? getItemModel(child.props as ItemProps)
        : getMenuModel(child.props as MenuProps))

  return {
    items,
    onAction: props.onAction || null
  }
}

function getMenuModel(props: MenuProps): MenuModel {
  const ret: MenuModel = {
    kind: 'menu',
    text: props.text,
    items: []
  }

  React.Children.forEach(props.children, (child: ReactElement<MenuProps | ItemProps>) => {
    const type: any = child.type 

    ret.items.push(
      type.child === Menu
        ? getMenuModel(child.props as MenuProps)
        : getItemModel(child.props as ItemProps))
  })

  return ret
}

function getItemModel(props: ItemProps): ItemModel {
  return {
    kind: 'item',
    text: props.text,
    name: props.name,
    disabled: props.disabled,
    onAction: props.onAction || null
  }
}
