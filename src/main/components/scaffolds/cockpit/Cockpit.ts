// external import
import { component, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internals import
import CockpitProps from './types/CockpitProps'
import CockpitView from './view/renderCockpit'

// --- Cockpit ------------------------------------------------

const Cockpit = component<CockpitProps>({
  displayName: 'Cockpit',

  validate: Spec.checkProps({
    optional: {
      slotBrand: isNode,
      slotTopNav: isNode,
      slotUserNav: isNode,
      slotSidebar: isNode,
      slotCenter: isNode
    }
  }),

  render: CockpitView
})

// --- exports ------------------------------------------------------

export default Cockpit
