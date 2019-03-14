// external import
import React, { ReactElement, ReactNode } from 'react'
import { defineComponent, isElement, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internals import
import renderCockpit from './view/renderCockpit'
import CockpitProps from './types/CockpitProps'
import CockpitBrandProps from './types/CockpitBrandProps'
import CockpitTopNavProps from './types/CockpitTopNavProps'
import CockpitUserNavProps from './types/CockpitUserNavProps'
import CockpitSidebarProps from './types/CockpitSidebarProps'
import CockpitCenterProps from './types/CockpitCenterProps'

// --- Cockpit ------------------------------------------------

const Cockpit = defineComponent<CockpitProps>({
  displayName: 'Cockpit',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(
            Spec.lazy(() =>
              isElementOfType([Brand, TopNav, UserNav, Sidebar, Center])))
        )
    }
  },

  render(props) {
    return renderCockpit(props)
  }
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

// --- Cockpit.Sidebar -----------------------------------------

const Sidebar = defineComponent<CockpitSidebarProps>({
  displayName: 'Cockpit.Sidebar',

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
      'Components of type Cockpit.Sidebar must be children of '
        + 'Cockpit components'
    )
  }
})

// --- Cockpit.Main -------------------------------------------

const Center = defineComponent<CockpitCenterProps>({
  displayName: 'Cockpit.Center',

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
      'Components of type Cockpit.Center must be children of '
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
  Sidebar,
  Center
})
