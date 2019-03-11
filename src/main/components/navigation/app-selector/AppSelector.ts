// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import AppSelectorProps from './types/AppSelectorProps'
import renderAppSelector from './view/renderAppSelector'

// --- AppSelector -----------------------------------------------------

const AppSelector = defineComponent<AppSelectorProps>({
  displayName: 'AppSelector',

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
    return renderAppSelector(props)
  }
})

// --- exports ------------------------------------------------------

export default AppSelector
