// external imports
import { component, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderVBox from './view/renderVBox'
import VBoxProps from './types/VBoxProps'

// --- VBox ---------------------------------------------------------

const VBox = component<VBoxProps>('VBox')
  .validate(
    Spec.checkProps({
      optional: {
        className: Spec.string,
        style: Spec.object,
        children: withChildren(isNode)
      }
    })
  )
  .render(renderVBox)

// --- exports ------------------------------------------------------

export default VBox 
