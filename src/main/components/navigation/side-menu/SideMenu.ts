// externals imports
import { ComponentType } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import SideMenuProps from './types/SideMenuProps'
import renderSideMenu from './view/renderSideMenu'

// --- SideMenu ------------------------------------------------------

const SideMenu = defineComponent<SideMenuProps>({
  displayName: 'SideMenu',

  properties: {
    activeItemId: {
      type: String
    },

    items: {
      type: Array,
      validate: Spec.lazy(() => specItems)
    }
  },

  render(props) {
    return renderSideMenu(props)
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
            Spec.strictShape({
              type: Spec.is('item'),
              id: Spec.string,
              text: Spec.string,
            })
        }, {
          when:
            Spec.prop('type', Spec.is('menu')),
            
          then:
            Spec.strictShape({
              type: Spec.is('menu'),
              menuId: Spec.optional(Spec.string),
              items: specItems
            })
        }))))

// --- exports ------------------------------------------------------

export default SideMenu
