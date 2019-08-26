// external imports 
import { component, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderCompound from './view/renderCompound'
import CompoundProps from './types/CompoundProps'

// --- Compound -----------------------------------------------------

const Compound = component<CompoundProps>('Compound')
  .validate(
    Spec.checkProps({
      optional: {
        className: Spec.string,
        style: Spec.object,
        children: withChildren(isNode)
      }
    })
  )
  .render(props => renderCompound(props))

// --- exports ------------------------------------------------------

export default Compound
