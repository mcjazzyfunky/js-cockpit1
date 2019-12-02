// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports

// --- components ----------------------------------------------------

const SelectBox = component({
  displayName: 'SelectBox',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validateSelectBoxProps) },

  render: SelectBoxView
})

// --- types ---------------------------------------------------------

type SelectBoxProps = {
  label?: string,
  field?: string
}

// --- validation ----------------------------------------------------

const validateSelectBoxProps = Spec.checkProps({
  optional: {
    label: Spec.string,
    field: Spec.string,
  }
})

// --- views ---------------------------------------------------------

function SelectBoxView({
  label,
  field
}: SelectBoxProps) {
  return 'SelectBox'
}

// --- exports -------------------------------------------------------

export default SelectBox
