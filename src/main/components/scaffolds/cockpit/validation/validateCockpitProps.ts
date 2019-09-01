// external imports
import { isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- validateCockpitProps -----------------------------------------

const validateCockpitProps = Spec.checkProps({
  optional: {
    slotBrand: isNode,
    slotTopNav: isNode,
    slotUserNav: isNode,
    slotSidebar: isNode,
    slotCenter: isNode
  }
})

// --- exports ------------------------------------------------------

export default validateCockpitProps
