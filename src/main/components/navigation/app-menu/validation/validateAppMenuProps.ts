// external imports
import { Spec } from 'js-spec'

// --- validateAppMenuProps -----------------------------------------

const validateAppMenuProps = Spec.checkProps({
  optional: {
    items:
    Spec.arrayOf(
        Spec.exact({
        type: Spec.is('app'),
        id: Spec.string,
        title: Spec.string,
        description: Spec.optional(Spec.string)
        })),
    
    showCallout: Spec.boolean,
    onSelection: Spec.function
  }
})

// --- exports ------------------------------------------------------

export default validateAppMenuProps
