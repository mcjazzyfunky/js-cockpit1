// external imports 
import { Spec } from 'js-spec'
import { component, isNode, withChildren } from 'js-react-utils'

// internal imports
import FieldSetProps from './types/FieldSetProps'
import renderFieldSet from './view/renderFieldSet'

// --- FieldSet ---------------------------------------------------------

const FieldSet = component<FieldSetProps>('FieldSet')
  .validate(
    Spec.checkProps({
      optional: {
        title: Spec.string,
        grow: Spec.number,
        className: Spec.string,
        style: Spec.object,
        children: withChildren(Spec.all(isNode))
      }
    })
  )
  .render(renderFieldSet)

// --- exports ------------------------------------------------------

export default FieldSet
