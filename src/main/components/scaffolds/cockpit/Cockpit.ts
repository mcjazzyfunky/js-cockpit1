// external import
import { component } from 'js-react-utils'

// internals import
import CockpitProps from './types/CockpitProps'
import CockpitView from './view/CockpitView'
import validateCockpitProps from './validation/validateCockpitProps'

// --- Cockpit ------------------------------------------------

const Cockpit = component<CockpitProps>({
  displayName: 'Cockpit',
  validate: validateCockpitProps,
  render: CockpitView
})

// --- exports ------------------------------------------------------

export default Cockpit
