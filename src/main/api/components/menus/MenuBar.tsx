import ActionEvent from '../../events/ActionEvent'
import React, { ReactNode, ReactElement } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- MenuBar.Item -------------------------------------------------

type ItemProps = {
  text: string,
  name?: string,
  disabled?: boolean,
  onAction: (event: ActionEvent) => void
}

const Item = defineComponent<ItemProps>({
  displayName: 'MenuBar.Item',

  properties: {
    text: {
      type: String,
      required: true
    },

    name: {
      type: String
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

const Menu = defineComponent<MenuProps>({
  displayName: 'MenuBar.Menu',

  properties: {
    text: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType([Item, Menu])))
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
  children: ReactNode,
  onAction: (event: ActionEvent) => void
}

const MenuBar = defineComponent<MenuBarProps>({
  displayName: 'MenuBar',

  properties: {
    children: {
      validate: withChildren(Spec.all(isElementOfType([Menu])))
    },
  
    onAction: {
      type: Function
    }
  },

  base: class extends React.Component<MenuBarProps> {
    private __menuBarInfo: MenuBarInfo
    private __menuBarInfoSource: MenuBarProps

    constructor(props: MenuBarProps) {
      super(props)
      this.__menuBarInfo = null
      this.__menuBarInfoSource = null
    }

    render() {
      return '[MenuBar ]'
    }

    private __prepareMenuBarInfo() {
      if (this.props !== this.__menuBarInfoSource) {
        this.__menuBarInfo = getMenuBarInfo(this.props)
        this.__menuBarInfoSource = this.props
      }
    }
  }
})

export default MenuBar

// --- helpers ------------------------------------------------------

type MenuBarInfo = {
  menus: MenuInfo[],
  onAction: (event: ActionEvent) => void | null
}

type MenuInfo = {
  kind: 'menu',
  text: string,
  items: ((MenuInfo | ItemInfo)[]) | null
}

type ItemInfo = {
  kind: 'item',
  text: string,
  name: string | null,
  disabled: boolean,
  onAction: ((event: ActionEvent) => void) | null
}

function getMenuBarInfo(props: MenuBarProps): MenuBarInfo {
  const menus: MenuInfo[] =
    React.Children.map(props.children, (child: ReactElement<MenuProps>) =>
      getMenuInfo(child.props as MenuProps))

  return {
    menus,
    onAction: props.onAction || null
  }
}

function getMenuInfo(props: MenuProps): MenuInfo {
  const ret: MenuInfo = {
    kind: 'menu',
    text: props.text,
    items: []
  }

  React.Children.forEach(props.children, (child: ReactElement<MenuProps | ItemProps>) => {
    const type: any = child.type 

    ret.items.push(
      type.child === Menu
        ? getMenuInfo(child.props as MenuProps)
        : getItemInfo(child.props as ItemProps))
  })

  return ret
}

function getItemInfo(props: ItemProps): ItemInfo {
  return {
    kind: 'item',
    text: props.text,
    name: props.name,
    disabled: props.disabled,
    onAction: props.onAction || null
  }
}
