// external imports 
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderContainer from './view/renderContainer'
import ContainerProps from './types/ContainerProps'

// --- HBox.Cell ----------------------------------------------------

const Container = defineComponent<ContainerProps>({
  displayName: 'Container',

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

  render(props) {
    return renderContainer(props)
  }
})

// --- exports ------------------------------------------------------

export default Container 
