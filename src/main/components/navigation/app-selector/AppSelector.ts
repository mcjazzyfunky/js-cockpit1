// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import AppSelectorProps from './AppSelectorProps'
import AppSelectorView from './AppSelectorView'

// --- AppSelector -----------------------------------------------------

const AppSelector = defineComponent<AppSelectorProps>({
  displayName: 'AppSelector',

  properties: {
    apps: {
      type: Array,

      validate:
        Spec.arrayOf(
          Spec.strictShape({
            kind: Spec.is('app'),
            id: Spec.string,
            title: Spec.string,
            description: Spec.optional(Spec.string)
          }))
    },

    onSelection: {
      type: Function
    }
  },

  render: AppSelectorView
})

// --- exports ------------------------------------------------------

export default AppSelector
