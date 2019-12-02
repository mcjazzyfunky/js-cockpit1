// external imports 
import { component, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import HBoxProps from './types/HBoxProps'
import HBoxView from './view/renderHBox'

// --- HBox ----------------------------------------------------------

const HBox = component<HBoxProps>({
  displayName: 'HBox',

  validate: Spec.checkProps({
    optional: {
      className: Spec.string,
      style: Spec.object,
      children: withChildren(Spec.all(isNode))
    }
  }),

  render: HBoxView
})

// --- exports -------------------------------------------------------

export default HBox
