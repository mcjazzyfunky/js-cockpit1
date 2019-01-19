// external import
import React, { ReactElement, ReactNode } from 'react'
import { defineComponent, isElement, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internals import
import CockpitProps from './CockpitProps'
import CockpitView from './CockpitView'
import CockpitBrandProps from './CockpitBrandProps'
import CockpitTopNavProps from './CockpitTopNavProps'
import CockpitUserNavProps from './CockpitUserNavProps'
import CockpitSideNavProps from './CockpitSideNavProps'
import CockpitMainContentProps from './CockpitMainContentProps'

// --- Cockpit ------------------------------------------------

const Cockpit = defineComponent<CockpitProps>({
  displayName: 'Cockpit',

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

  render: CockpitView 
})

// --- Cockpit.Brand ------------------------------------------

const Brand = defineComponent<CockpitBrandProps>({
  displayName: 'Cockpit.Brand',

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
      'Components of type Cockpit.Brand must be children of '
        + 'Cockpit components'
    )
  }
})

// --- Cockpit.TopNav -----------------------------------------

const TopNav = defineComponent<CockpitTopNavProps>({
  displayName: 'Cockpit.TopNav',

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
      'Components of type Cockpit.TopNav must be children of '
        + 'Cockpit components'
    )
  }
})

// --- Cockpit.UserNav ---------------------------------------

const UserNav = defineComponent<CockpitUserNavProps>({
  displayName: 'Cockpit.UserNav',

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
      'Components of type Cockpit.UserNav must be children of '
        + 'Cockpit components'
    )
  }
})

// --- Cockpit.Menu -------------------------------------------

const Menu = defineComponent<CockpitUserNavProps>({
  displayName: 'Cockpit.Menu',

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
      'Components of type Cockpit.Menu must be children of '
        + 'Cockpit components'
    )
  }
})

// --- Cockpit.SideNav -----------------------------------------

const SideNav = defineComponent<CockpitSideNavProps>({
  displayName: 'Cockpit.SideNav',

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
      'Components of type Cockpit.SideNav must be children of '
        + 'Cockpit components'
    )
  }
})

// --- Cockpit.Main -------------------------------------------

const MainContent = defineComponent<CockpitMainContentProps>({
  displayName: 'Cockpit.MainContent',

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
      'Components of type Cockpit.MainContent must be children of '
        + 'Cockpit components'
    )
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(Cockpit, {
  Brand,
  TopNav,
  UserNav,
  Menu,
  SideNav,
  MainContent
})
