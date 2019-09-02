// external imports
import { isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- validateBrandProps -------------------------------------------

const validateBrandProps = Spec.checkProps({
  optional: {
    vendor: Spec.string,
    title: Spec.string,
    logo: isNode,
    size: Spec.oneOf('medium', 'large', 'huge')
  }
})

// --- exports ------------------------------------------------------

export default validateBrandProps
