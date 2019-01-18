// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import MenuBarProps from './MenuBarProps'
import MenuBarItemProps from './MenuBarItemProps'
import MenuBarMenuProps from './MenuBarMenuProps'
import MenuBarView from './MenuBarView'

// --- MenuBar.Item -------------------------------------------------

const Item = defineComponent<MenuBarItemProps>({
  displayName: 'MenuBar.Item',

  properties: {
    id: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
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
      'Components of type MenuBar.Item must be children of '
        + 'MenuBar or MenuBar.Menu components')
  }
})

// --- MenuBar.Menu -------------------------------------------------

const Menu = defineComponent<MenuBarMenuProps>({
  displayName: 'MenuBar.Menu',

  properties: {
    text: {
      type: String,
      required: true
    },

    children: {
      type: Object
    }
  },

  render() {
    throw new Error(
      'Components of type MenuBar.Menu must be children of '
        + 'MenuBar or MenuBar.Menu components')
  }
})

// --- MenuBar --------------------------------------------------------

const MenuBar = defineComponent<MenuBarProps>({
  displayName: 'MenuBar',

  properties: {
    onAction: {
      type: Function
    },

    children: {
      type: Object
    }
  },

  render(props) {
    return MenuBarView(props)
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(MenuBar, {
  Item,
  Menu
})
