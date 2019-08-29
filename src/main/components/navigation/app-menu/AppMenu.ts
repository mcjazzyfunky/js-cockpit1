// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import AppMenuProps from './types/AppMenuProps'
import AppMenuView from './view/AppMenuView'

// --- AppMenu -----------------------------------------------------

const AppMenu = component<AppMenuProps>({
  displayName: 'AppMenu',

  validate: Spec.checkProps({
    optional: {
      items:
        Spec.arrayOf(
          Spec.exact({
            type: Spec.is('app'),
            id: Spec.string,
            title: Spec.string,
            description: Spec.optional(Spec.string)
          })),
      
      showCallout: Spec.boolean,
      onSelection: Spec.function
    }
  }),

  render: AppMenuView
})

// --- exports ------------------------------------------------------

export default AppMenu
