// external imports
import { Spec } from 'js-spec'

// --- validateRadioGroupProps --------------------------------------

const validateRadioGroupProps = Spec.checkProps({
  required: {
    options: Spec.arrayOf(
      Spec.exact({
        key: Spec.string,
        text: Spec.string
      }))
    },

  optional: {
    label: Spec.string,
    name: Spec.string,
    defaultSelectedKey: Spec.string,
    orientation: Spec.string,
    grow: Spec.number
  }
})

// --- exports ------------------------------------------------------

export default validateRadioGroupProps
