// external import
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internals import
import renderCockpit from './view/renderCockpit'
import CockpitProps from './types/CockpitProps'

// --- Cockpit ------------------------------------------------

const Cockpit = defineComponent<CockpitProps>({
  displayName: 'Cockpit',

  validate: Spec.exactProps({
    optional: {
      slotBrand: isNode,
      slotTopNav: isNode,
      slotUserNav: isNode,
      slotSidebar: isNode,
      slotCenter: isNode
    }
  }),

  render(props) {
    return renderCockpit(props)
  }
})

// --- exports ------------------------------------------------------

export default Cockpit
