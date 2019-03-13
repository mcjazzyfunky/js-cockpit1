// externals imports
import { ComponentType } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import SideNavProps from './types/SideNavProps'
import renderSideNav from './view/renderSideNav'

// --- SideNav ------------------------------------------------------

const SideNav = defineComponent<SideNavProps>({
  displayName: 'SideNav',

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
    return renderSideNav(props)
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

export default SideNav
