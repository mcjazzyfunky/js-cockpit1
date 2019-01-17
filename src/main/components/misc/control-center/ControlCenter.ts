// external import
import React, { ReactElement, ReactNode } from 'react'
import { defineComponent, isElement, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internals import
import ControlCenterProps from './ControlCenterProps'
import ControlCenterView from './ControlCenterView'
import ControlCenterBrandProps from './ControlCenterBrandProps'
import ControlCenterTopNavProps from './ControlCenterTopNavProps'
import ControlCenterUserNavProps from './ControlCenterUserNavProps'
import ControlCenterSideNavProps from './ControlCenterSideNavProps'
import ControlCenterMainContentProps from './ControlCenterMainContentProps'

// --- ControlCenter ------------------------------------------------

const ControlCenter = defineComponent<ControlCenterProps>({
  displayName: 'ControlCenter',

  properties: {
    onLogout: {
      type: Function
    },

    children: {
      validate:
        withChildren(
          Spec.all(
            Spec.lazy(() =>
              isElementOfType([Brand, TopNav, UserNav, SideNav, MainContent])))
        )
    }
  },

  render: ControlCenterView 
})

// --- ControlCenter.Brand ------------------------------------------

const Brand = defineComponent<ControlCenterBrandProps>({
  displayName: 'ControlCenter.Brand',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate:
        withChildren(
          Spec.all(isNode))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.Brand must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.TopNav -----------------------------------------

const TopNav = defineComponent<ControlCenterTopNavProps>({
  displayName: 'ControlCenter.TopNav',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate:
        withChildren(
          Spec.all(isNode))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.TopNav must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.UserNav ---------------------------------------

const UserNav = defineComponent<ControlCenterUserNavProps>({
  displayName: 'ControlCenter.UserNav',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate:
        withChildren(
          Spec.all(isNode))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.UserNav must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.Menu -------------------------------------------

const Menu = defineComponent<ControlCenterUserNavProps>({
  displayName: 'ControlCenter.Menu',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate:
        withChildren(
          Spec.all(isNode))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.Menu must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.SideNav -----------------------------------------

const SideNav = defineComponent<ControlCenterSideNavProps>({
  displayName: 'ControlCenter.SideNav',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate:
        withChildren(
          Spec.all(isNode))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.SideNav must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.Main -------------------------------------------

const MainContent = defineComponent<ControlCenterMainContentProps>({
  displayName: 'ControlCenter.MainContent',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate:
        withChildren(
          Spec.all(isNode))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.MainContent must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(ControlCenter, {
  Brand,
  TopNav,
  UserNav,
  Menu,
  SideNav,
  MainContent
})
