// external imports 
import { Spec } from 'js-spec'
import { component, isNode, withChildren } from 'js-react-utils'

// internal imports
import FieldSetProps from './types/FieldSetProps'
import FieldSetView from './view/FieldSetView'

// --- FieldSet ----------------------------------------------------------

const FieldSet = component<FieldSetProps>({
  displayName: 'FieldSet',

  validate: Spec.checkProps({
    optional: {
      title: Spec.string,
      grow: Spec.number,
      className: Spec.string,
      style: Spec.object,
      children: withChildren(Spec.all(isNode))
    }
  }),
  
  render: FieldSetView
})

// --- exports -------------------------------------------------------

export default FieldSet
