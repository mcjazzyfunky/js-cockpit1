// external imports
import { component, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import VBoxProps from './types/VBoxProps'
import VBoxView from './view/renderVBox'

// --- VBox ----------------------------------------------------------

const VBox = component<VBoxProps>({
  displayName: 'VBox',

  validate: Spec.checkProps({
    optional: {
      className: Spec.string,
      style: Spec.object,
      children: withChildren(isNode)
    }
  }),

  render: VBoxView
})

// --- exports -------------------------------------------------------

export default VBox 
