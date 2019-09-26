// externals imports
import { ComponentType } from 'react'
import { component, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import VerticalMenuProps from './types/VerticalMenuProps'
import VerticalMenuView from './view/VerticalMenuView'

// --- VerticalMenu ------------------------------------------------------

const VerticalMenu = component<VerticalMenuProps>({
  displayName: 'VerticalMenu',

  validate: Spec.checkProps({
    required: {
      items: Spec.lazy(() => specItems)
    },

    optional: {
      activeItemId: Spec.string,
      collapsible: Spec.boolean,
    }
  }),

  render: VerticalMenuView
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
