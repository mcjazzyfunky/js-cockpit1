// externals imports
import { ComponentType } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import SideNavProps from './SideNavProps'
import SideNavItemProps from './SideNavItemProps'
import SideNavItemGroupProps from './SideNavItemGroupProps'
import SideNavView from './SideNavView'

// --- SideNav.Item -------------------------------------------------

const Item = defineComponent<SideNavItemProps>({
  displayName: 'SideNav.Item',

  properties: {
    title: {
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
      + 'of SideNav or SideNav.ItemGroup components')
  }
})

// --- SideNav.ItemGroup --------------------------------------------

const ItemGroup:  ComponentType<SideNavItemGroupProps> = defineComponent<SideNavItemGroupProps>({
  displayName: 'SideNav.ItemGroup',

  properties: {
    title: {
      type: String,
      required: true
    },

    groupId: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType([Item, ItemGroup]))))
    }
  },

  render() {
    throw new Error('Components of type SideNav.ItemGroup must be children '
      + 'of SideNav or SideNav.ItemGroup components')
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
          Spec.singleOf(isElementOfType([ItemGroup])))
    }
  },

  render(props) {
    return SideNavView(props)
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(SideNav, {
  Item,
  ItemGroup,
})
