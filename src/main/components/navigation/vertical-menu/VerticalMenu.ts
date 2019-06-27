// externals imports
import { ComponentType } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import VerticalMenuProps from './types/VerticalMenuProps'
import renderVerticalMenu from './view/renderVerticalMenu'

// --- VerticalMenu ------------------------------------------------------

const VerticalMenu = defineComponent<VerticalMenuProps>({
  displayName: 'VerticalMenu',

  properties: {
    activeItemId: {
      type: String
    },

    collapsible: {
      type: Boolean,
      defaultValue: false
    },

    items: {
      type: Array,
      validate: Spec.lazy(() => specItems)
    }
  },

  render(props) {
    return renderVerticalMenu(props)
  }
})

// --- locals -------------------------------------------------------

const specItems =
  Spec.lazy(() =>
    Spec.arrayOf(
      Spec.and(
        Spec.prop('type', Spec.oneOf('item', 'menu')),
        Spec.or({
          when:
            Spec.prop('type', Spec.is('item')),

          then:
            Spec.exact({
              type: Spec.is('item'),
              id: Spec.string,
              text: Spec.string,
            })
        }, {
          when:
            Spec.prop('type', Spec.is('menu')),
            
          then:
            Spec.exact({
              type: Spec.is('menu'),
              menuId: Spec.optional(Spec.string),
              items: specItems
            })
        }))))

// --- exports ------------------------------------------------------

export default VerticalMenu
