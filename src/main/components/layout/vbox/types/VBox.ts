// external imports
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderVBox from '../view/renderVBox'
import VBoxProps from './VBoxProps'
import VBoxCellProps from './VBoxCellProps'

// --- VBox.Cell ----------------------------------------------------

const Cell = defineComponent<VBoxCellProps>({
  displayName: 'VBox.Cell',

  properties: {
    grow: {
      type: Number,
      validate: Spec.nonnegativeFloat
    },
    
    shrink: {
      type: Number,
      validate: Spec.nonnegativeFloat
    },

    horizontalAlign: {
      type: String,
      validate: Spec.oneOf('start', 'center', 'end'),
    },

    verticalAlign: {
      type: String,
      validate: Spec.oneOf('top', 'middle', 'bottom'),
    },

    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(Spec.all(isNode))
    },
  },

  render() {
    throw new Error('Components of type VBox.Cell can only '
      + 'be used as direct children of VBox components')
  }
})

// --- VBox ---------------------------------------------------------

const VBox = defineComponent<VBoxProps>({
  displayName: 'VBox',

  properties: {
    className: {
      type: String
    },

    style: {
      type: Object
    },

    children: {
      validate: withChildren(Spec.all(isElementOfType(Cell)))
    }
  },

  render(props) {
    return renderVBox(props)
  }
})

export default Object.assign(VBox, {
  Cell
})
