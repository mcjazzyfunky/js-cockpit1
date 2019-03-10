// external imports 
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderHBox from './view/renderHBox'
import HBoxProps from './types/HBoxProps'
import HBoxCellProps from './types/HBoxCellProps'

// --- HBox.Cell ----------------------------------------------------

const Cell = defineComponent<HBoxCellProps>({
  displayName: 'HBox.Cell',

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
    throw new Error('Components of type HBox.Cell can only '
      + 'be used as direct children of HBox components')
  }
})

// --- HBox ---------------------------------------------------------

const HBox = defineComponent<HBoxProps>({
  displayName: 'HBox',

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
    return renderHBox(props)
  }
})

// --- exports ------------------------------------------------------

export default Object.assign(HBox, {
  Cell
})
