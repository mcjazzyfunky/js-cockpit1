// external import
import { component, isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// internals import
import renderCockpit from './view/renderCockpit'
import CockpitProps from './types/CockpitProps'

// --- Cockpit ------------------------------------------------

const Cockpit = component<CockpitProps>('Cockpit')
  .validate(
    Spec.checkProps({
      optional: {
        slotBrand: isNode,
        slotTopNav: isNode,
        slotUserNav: isNode,
        slotSidebar: isNode,
        slotCenter: isNode
      }
    })
  )
  .render(renderCockpit) 

// --- exports ------------------------------------------------------

export default Cockpit
