// external imports 
import { component, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderHBox from './view/renderHBox'
import HBoxProps from './types/HBoxProps'

// --- HBox ---------------------------------------------------------

const HBox = component<HBoxProps>('HBox')
  .validate(
    Spec.checkProps({
      optional: {
        className: Spec.string,
        style: Spec.object,
        children: withChildren(Spec.all(isNode))
      }
    })
  )
  .render(renderHBox)

// --- exports ------------------------------------------------------

export default HBox
