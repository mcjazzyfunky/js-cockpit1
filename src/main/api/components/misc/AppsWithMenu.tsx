import React, { ComponentType, ReactElement, ReactNode } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'
import ActionEvent from '../../events/ActionEvent'
import Model_AppsWithMenuRenderer from '../../../renderers/AppsWithMenu/AppsWithMenuRenderer'

// --- AppsWithMenu.Item -------------------------------------------

type ItemProps = {
  title: string,
  name: string,
  onAction?: (event: ActionEvent) => void
}

const Item = defineComponent<ItemProps>({
  displayName: 'AppsWithMenu.Item',

  properties: {
    title: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    onAction: {
      type: Function
    }
  },

  render() {
    throw new Error('Components of type AppsWithMenu.Item must be children '
      + 'of AppsWithMenu.Menus or AppsWithMenu.Menu components')
  }
})

// --- AppsWithMenu.Menu --------------------------------------------
type MenuProps = {
  title: string,
  name: string,
  children: ReactNode // TODO
}

const Menu: ComponentType<MenuProps> = defineComponent<MenuProps>({
  displayName: 'AppsWithMenu.Menu',

  properties: {
    title: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType([Menu, Item]))))
    }
  },

  render() {
    throw new Error('Components of type AppsWithMenu.Menu must be children '
      + 'of AppsWithMenu.Menus or AppsWithMenu.Menu components')
  }
})

// --- AppsWithMenu.Menus -------------------------------------------

type MenusProps = {
  children: ReactNode // TODO
}

const Menus = defineComponent({
  displayName: 'AppsWithMenu.Menus',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Menu, Item])))
    }
  },

  render() {
    throw new Error('Components of type AppsWithMenu.Menus must be children '
      + 'of AppsWithMenu components')
  }
})

// --- AppsWithMenu -------------------------------------------------

type Model_AppsWithMenuProps = {
  children: ReactNode // TODO
}

const Model_AppsWithMenu = defineComponent<Model_AppsWithMenuProps>({
  displayName: 'AppsWithMenuProps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Menus])))
    }
  },

  base: class Base extends React.Component<Model_AppsWithMenuProps> {
    private _model: Model_AppsWithMenu = null
    private _modelSource: Model_AppsWithMenuProps = null
    
    render() {
      this._prepareModel_AppsWithMenuModel()
      return Model_AppsWithMenuRenderer.render(this._model)
    }

    private _prepareModel_AppsWithMenuModel() {
      if (this.props !== this._modelSource) {
        this._model = Base._getModel_AppsWithMenuModel(this.props)
        this._modelSource = this.props
      }
    }

    static _getModel_AppsWithMenuModel(props: Model_AppsWithMenuProps): Model_AppsWithMenu {
      const ret: Model_AppsWithMenu = {
        kind: 'Model_AppsWithMenu',
        menu: []
      }

      React.Children.forEach(props.children, (child: ReactElement<MenusProps>) => {
        if (child.type === Menus) {
          React.Children.forEach(child.props.children, (child2: ReactElement<MenuProps | ItemProps>) => {
            ret.menu.push(
              child2.type === Menu
                ? Base._getMenuModel(child2.props as MenuProps)
                : Base._getItemModel(child2.props as ItemProps))
          })
        }
      })

      return ret
    }

    private static _getMenuModel(props: MenuProps): Model_AppsWithMenu_Menu {
      const ret: Model_AppsWithMenu_Menu = {
        kind: 'Model_AppsWithMenu_Menu',
        title: props.title,
        name: props.name,
        items: []
      }

      React.Children.forEach(props.children, (child: ReactElement<MenuProps | ItemProps>) => {
        ret.items.push(
          child.type === Menu
            ? Base._getMenuModel(child.props as MenuProps)
            : Base._getItemModel(child.props as ItemProps))
      })

      return ret
    }

    private static _getItemModel(props: ItemProps): Model_AppsWithMenu_Item {
      const ret: Model_AppsWithMenu_Item = {
        kind: 'Model_AppsWithMenu_Item',
        title: props.title,
        name: props.name
      }

      if (props.onAction) {
        ret.onAction = props.onAction
      }

      return ret
    }
  }
})

// --- models -------------------------------------------------------

type Model_AppsWithMenu = {
  kind: 'Model_AppsWithMenu',
  menu: (Model_AppsWithMenu_Menu | Model_AppsWithMenu_Item)[]
}

type Model_AppsWithMenu_Menu = {
  kind: 'Model_AppsWithMenu_Menu',
  title: string,
  name: string,
  items: (Model_AppsWithMenu_Menu | Model_AppsWithMenu_Item)[]
}

type Model_AppsWithMenu_Item = {
  kind: 'Model_AppsWithMenu_Item',
  title: string,
  name: string,
  onAction?: (event: ActionEvent) => void
}

// --- exports ------------------------------------------------------

export default Object.assign(Model_AppsWithMenu, {
  Item,
  Menu,
  Menus
})

export {
  Model_AppsWithMenu,
  Model_AppsWithMenu_Menu,
  Model_AppsWithMenu_Item,
}
