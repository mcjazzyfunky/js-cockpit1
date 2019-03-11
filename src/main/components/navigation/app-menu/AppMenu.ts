// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import AppMenuProps from './types/AppMenuProps'
import renderAppMenu from './view/renderAppMenu'

// --- AppMenu -----------------------------------------------------

const AppMenu = defineComponent<AppMenuProps>({
  displayName: 'AppMenu',

  properties: {
    apps: {
      type: Array,

      validate:
        Spec.arrayOf(
          Spec.strictShape({
            type: Spec.is('app'),
            id: Spec.string,
            title: Spec.string,
            description: Spec.optional(Spec.string)
          }))
    },

    showCallout: {
      type: Boolean,
      defaultValue: false
    },

    onSelection: {
      type: Function
    }
  },

  render(props) {
    return renderAppMenu(props)
  }
})

// --- exports ------------------------------------------------------

export default AppMenu
