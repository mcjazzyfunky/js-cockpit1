// external import
import React, { ReactElement, ReactNode } from 'react'
import { defineComponent, isElement, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internals import
import ControlCenterProps from './ControlCenterProps'
import ControlCenterView from './ControlCenterView'
import ControlCenterAppProps from './ControlCenterAppProps'

// --- ControlCenter ------------------------------------------------

const ControlCenter = defineComponent<ControlCenterProps>({
  displayName: 'ControlCenter',

  properties: {
    vendor: {
      type: String
    },

    title: {
      type: String,
      required: true
    },

    logo: {
      type: Object,
      validate: isElement
    },

    children: {
      validate:
        withChildren(
          Spec.all(Spec.lazy(() => isElementOfType([Apps])))
        )
    }
  },

  render: ControlCenterView 
})

// --- ControlCenter.Apps -------------------------------------------

type AppsProps = {
  children?: ReactNode
}

const Apps = defineComponent({
  displayName: 'ControlCenter.Apps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType(App))))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.Login must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.App --------------------------------------------

const App = defineComponent<ControlCenterAppProps>({
  displayName: 'ControlCenter.App',

  properties: {
    id: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    children: {
      validate:
        withChildren(
          Spec.all(isNode))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.App must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(ControlCenter, {
  Apps,
  App
})
