// external imports
import { component, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import MenuBarProps from './types/MenuBarProps'
import MenuBarView from './view/MenuBarView'

// --- MenuBar --------------------------------------------------------

const MenuBar = component<MenuBarProps>({
  displayName: 'MenuBar',

  validate: Spec.checkProps({
    optional: {
      onAction: Spec.function,
      items: Spec.lazy(() => specItems),
      showMenuBeaks: Spec.boolean
    }
  }),

  render: MenuBarView
})

// --- locals -------------------------------------------------------

const specItems =
  Spec.lazy(() =>
    Spec.arrayOf(
      Spec.and(
        Spec.prop('type', Spec.oneOf('menu', 'item', 'divider')),

        Spec.or(
          {
            when: Spec.prop('type', Spec.is('menu')),

            then:
              Spec.exact({
                type: Spec.is('menu'),
                id: Spec.string,
                text: Spec.string,
                items: specItems 
              })
          },
          {
            when: Spec.prop('type', Spec.is('item')),

            then:
              Spec.exact({
                type: Spec.is('item'),
                id: Spec.string,
                text: Spec.string,
                disabled: Spec.optional(Spec.boolean),
                onAction: Spec.optional(Spec.function)
              })
          },
          {
            when: Spec.prop('type', Spec.is('divider')),

            then:
              Spec.exact({
                type: Spec.is('divider')
              })
          }
        ))))

// --- exports ------------------------------------------------------

export default MenuBar
