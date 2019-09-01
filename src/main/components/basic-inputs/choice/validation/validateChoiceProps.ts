// external imports
import { Spec } from 'js-spec'

// --- validateChoiceProps ------------------------------------------

const validateChoiceProps = Spec.checkProps({
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
    id: Spec.string,
    grow: Spec.float,
  }
})

// --- externals ----------------------------------------------------

export default validateChoiceProps
