// external imports
import { Spec } from 'js-spec'

// --- validateCheckGroupProps ---------------------------------------

const validateCheckGroupProps = Spec.checkProps({
  required: {
    options: 
      Spec.arrayOf(
        Spec.exact({
          key: Spec.string,
          text: Spec.string
        }))
  },

  optional: {
    label: Spec.string,
    name: Spec.string,
    selectedKeys: Spec.arrayOf(Spec.string),
    orientation: Spec.oneOf('horizontal', 'vertical'),
    grow: Spec.number
  }
})

// --- exports -------------------------------------------------------

export default validateCheckGroupProps
