// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import MenuBarProps from './MenuBarProps'
import MenuBarView from './MenuBarView'

// --- MenuBar --------------------------------------------------------

const MenuBar = defineComponent<MenuBarProps>({
  displayName: 'MenuBar',

  properties: {
    onAction: {
      type: Function
    },

    items: {
      type: Object,

      validate:
        Spec.arrayOf(
          Spec.and(
            Spec.prop('kind', Spec.oneOf('menu', 'item')),

            Spec.or(
              {
                when: Spec.prop('kind', Spec.is('menu')),

                then:
                  Spec.strictShape({
                    kind: Spec.is('menu'),
                    text: Spec.string,
                    items: Spec.array
                  })
              },
              {
                when: Spec.prop('kind', Spec.is('item')),

                then:
                  Spec.strictShape({
                    kind: Spec.is('item'),
                    text: Spec.string,
                    disabled: Spec.optional(Spec.boolean),
                    onAction: Spec.optional(Spec.function)
                  })
              }
            )))
    }
  },

  render(props) {
    return MenuBarView(props)
  }
})

// --- exports ------------------------------------------------------

export default MenuBar
