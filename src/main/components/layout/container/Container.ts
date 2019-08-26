// external imports 
import { component, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import renderContainer from './view/renderContainer'
import ContainerProps from './types/ContainerProps'

// --- HBox.Cell ----------------------------------------------------

const Container = component<ContainerProps>('Container')
  .validate(
    Spec.checkProps({
      optional: {
        grow: Spec.nonnegativeFloat,
        shrink: Spec.nonnegativeFloat,
        horizontalAlign: Spec.oneOf('start', 'center', 'end'),
        verticalAlign: Spec.oneOf('top', 'middle', 'bottom'),
        className: Spec.string,
        style: Spec.object,
        children: withChildren(isNode)
      }
    })
  )
  .render(props => renderContainer(props))

// --- exports ------------------------------------------------------

export default Container 
