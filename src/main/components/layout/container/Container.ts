// external imports 
import { component, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import ContainerProps from './types/ContainerProps'
import ContainerView from './view/renderContainer'

// --- Container -----------------------------------------------------

const Container = component<ContainerProps>({
  displayName: 'Container',

  validate: Spec.checkProps({
    optional: {
      grow: Spec.nonnegativeFloat,
      shrink: Spec.nonnegativeFloat,
      horizontalAlign: Spec.oneOf('start', 'center', 'end'),
      verticalAlign: Spec.oneOf('top', 'middle', 'bottom'),
      className: Spec.string,
      style: Spec.object,
      children: withChildren(isNode)
    }
  }),
  
  render: ContainerView
})

// --- exports -------------------------------------------------------

export default Container 
