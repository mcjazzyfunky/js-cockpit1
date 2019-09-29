// external imports
import { Spec } from 'js-spec'

// --- validateAppMenuProps -----------------------------------------

const validateAppMenuProps = Spec.checkProps({
  optional: {
    items:
    Spec.arrayOf(
      Spec.exact({
      type: Spec.is('item'),
      id: Spec.string,
      title: Spec.string,
      description: Spec.optional(Spec.string)
    })),
    
    mode: Spec.oneOf('default', 'callout'),
    onAction: Spec.function
  }
})

// --- exports ------------------------------------------------------

export default validateAppMenuProps
