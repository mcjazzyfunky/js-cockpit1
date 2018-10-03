import React, { ReactElement } from 'react'
import { defineComponent, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'
import ActionEvent from '../../events/ActionEvent'
import AppsWithMenuRenderer from '../../../renderers/AppsWithMenu/AppsWithMenuRenderer'

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
  children: ReactElement<any> // TODO
}

const Menu = defineComponent<MenuProps>({
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
  children: ReactElement<any> // TODO
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

type AppsWithMenuProps = {
  children: ReactElement<any> // TODO
}

const AppsWithMenu = defineComponent<AppsWithMenuProps>({
  displayName: 'AppsWithMenuProps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Menus])))
    }
  },

  base: class Base extends React.Component<AppsWithMenuProps> {
    private _model = null
    private _modelSource = null
    
    render() {
      this._prepareAppsWithMenuModel()
      return AppsWithMenuRenderer.render(this._model)
    }

    private _prepareAppsWithMenuModel() {
      if (this.props !== this._modelSource) {
        this._model = Base._getAppsWithMenuModel(this.props)
        this._modelSource = this.props
      }
    }

    static _getAppsWithMenuModel(props: AppsWithMenuProps): AppsWithMenuModel {
      const ret = null

      React.Children.forEach(props.children, (child: ReactElement<any>) => {
        let ret: AppsWithMenuModel = {
          menu: []
        }

        if (child.type === AppsWithMenu) {
          React.Children.forEach(child.props, (child2: ReactElement<MenuProps | ItemProps>) => {
            ret.menu.push(
              child2.type === Menu
                ? Base._getMenuModel(child2.props as MenuProps)
                : Base._getItemModel(child2.props as ItemProps))
          })
        }
      })

      return ret
    }

    private static _getMenuModel(props: MenuProps): MenuModel {
      const ret: MenuModel = {
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

    private static _getItemModel(props: ItemProps): ItemModel {
      const ret: ItemModel = {
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

type AppsWithMenuModel = {
  menu: (MenuModel | ItemModel)[]
}

type MenuModel = {
  title: string,
  name: string,
  items: (MenuModel | ItemModel)[]
}

type ItemModel = {
  title: string,
  name: string,
  onAction?: (event: ActionEvent) => void
}
