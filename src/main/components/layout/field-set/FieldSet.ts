// external imports 
import { Spec } from 'js-spec'
import { defineComponent, isNode, withChildren } from 'js-react-utils'

// internal imports
import FieldSetProps from './types/FieldSetProps'
import renderFieldSet from './view/renderFieldSet'

// --- FieldSet ---------------------------------------------------------

const FieldSet = defineComponent<FieldSetProps>({
  displayName: 'FieldSet',

  properties: {
    title: {
      type: String
    },

    grow: {
      type: Number
    },

    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(isNode)
    }
  },

  render(props) {
    return renderFieldSet(props)
  }
})

// --- exports ------------------------------------------------------

export default FieldSet
