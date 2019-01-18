// externals imports
import { ComponentType } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import SideNavProps from './SideNavProps'
import SideNavItemProps from './SideNavItemProps'
import SideNavMenuProps from './SideNavMenuProps'
import SideNavView from './SideNavView'

// --- SideNav.Item -------------------------------------------------

const Item = defineComponent<SideNavItemProps>({
  displayName: 'SideNav.Item',

  properties: {
    text: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true
    },
  },

  render() {
    throw new Error('Components of type SideNav.Item must be children '
      + 'of SideNav or SideNav.Menu components')
  }
})

// --- SideNav.Menu --------------------------------------------

const Menu:  ComponentType<SideNavMenuProps> = defineComponent<SideNavMenuProps>({
  displayName: 'SideNav.Menu',

  properties: {
    text: {
      type: String,
      required: true
    },

    menuId: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType(Item))))
    }
  },

  render() {
    throw new Error('Components of type SideNav.Menu must be children '
      + 'of SideNav or SideNav.Menu components')
  }
})

// --- SideNav ------------------------------------------------------

const SideNav = defineComponent<SideNavProps>({
  displayName: 'SideNav',

  properties: {
    selectedId: {
      type: String
    },

    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([Menu])))
    }
  },

  render(props) {
    return SideNavView(props)
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(SideNav, {
  Item,
  Menu,
})
