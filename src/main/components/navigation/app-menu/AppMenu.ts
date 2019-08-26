// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import AppMenuProps from './types/AppMenuProps'
import renderAppMenu from './view/renderAppMenu'

// --- AppMenu -----------------------------------------------------

const AppMenu = component<AppMenuProps>('AppMenu')
  .validate(
    Spec.checkProps({
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
    })
  )
  .defaultProps({
    showCallout: false
  })
  .render(renderAppMenu)

// --- exports ------------------------------------------------------

export default AppMenu
