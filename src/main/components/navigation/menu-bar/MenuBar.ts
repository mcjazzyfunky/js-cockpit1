// external imports
import { defineComponent, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import MenuBarProps from './types/MenuBarProps'
import renderMenuBar from './view/renderMenuBar'

// --- MenuBar --------------------------------------------------------

const MenuBar = defineComponent<MenuBarProps>({
  displayName: 'MenuBar',

  properties: {
    onAction: {
      type: Function
    },

    items: {
      type: Object,
      validate: Spec.lazy(() => specItems)
    }
  },

  render(props) {
    return renderMenuBar(props)
  }
})

// locals
const specItems =
  Spec.lazy(() =>
    Spec.arrayOf(
      Spec.and(
        Spec.prop('type', Spec.oneOf('menu', 'item')),

        Spec.or(
          {
            when: Spec.prop('type', Spec.is('menu')),

            then:
              Spec.strictShape({
                type: Spec.is('menu'),
                text: Spec.string,
                items: specItems 
              })
          },
          {
            when: Spec.prop('type', Spec.is('item')),

            then:
              Spec.strictShape({
                type: Spec.is('item'),
                text: Spec.string,
                disabled: Spec.optional(Spec.boolean),
                onAction: Spec.optional(Spec.function)
              })
          }
        ))))

// --- exports ------------------------------------------------------

export default MenuBar
