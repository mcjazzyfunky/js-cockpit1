// external imports 
import { defineComponent, isNode, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import TabsProps from './types/TabsProps'
import TabsPageProps from './types/TabsPageProps'
import renderTabs from './view/renderTabs'

// --- Tabs.Page ----------------------------------------------------

const Page = defineComponent<TabsPageProps>({
  displayName: 'Tabs.Page',

  properties: {
    title: {
      type: String
    },
    
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(isNode)
    }
  },

  render() {
    return 'Page'
  }
})

// --- Tabs ---------------------------------------------------------

const Tabs = defineComponent<TabsProps>({
  displayName: 'Tabs',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(
        Spec.all(isElementOfType(Page)))
    }
  },

  render(props) {
    return renderTabs(props)
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(Tabs, {
  Page
})
