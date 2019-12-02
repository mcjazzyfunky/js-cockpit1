// external imports 
import { component, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import CompoundProps from './types/CompoundProps'
import CompoundView from './view/renderCompound'

// --- Compound ------------------------------------------------------

const Compound = component<CompoundProps>({
  displayName: 'Compound',

  validate: Spec.checkProps({
    optional: {
      className: Spec.string,
      style: Spec.object,
      children: withChildren(isNode)
    }
  }),
  
  render: CompoundView
})

// --- exports -------------------------------------------------------

export default Compound
