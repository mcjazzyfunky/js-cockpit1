// external imports
import { isNode } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- validateBrandProps -------------------------------------------

const validateBrandProps = Spec.checkProps({
  optional: {
    vender: Spec.string,
    title: Spec.string,
    logo: isNode,
    size: Spec.oneOf('medium', 'large', 'huge'),
    className: Spec.string,
    style: Spec.object
    }
})

// --- exports ------------------------------------------------------

export default validateBrandProps
