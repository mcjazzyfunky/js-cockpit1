// external imports
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import CheckGroupProps from './types/CheckGroupProps'
import CheckGroupView from './view/renderCheckGroup'

// --- CheckGroup ---------------------------------------------------

const validateCheckGroup = Spec.checkProps({
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

const CheckGroup = component<CheckGroupProps>({
  displayName: 'CheckGroup',
  validate: validateCheckGroup,
  render: CheckGroupView
})

// --- exports ------------------------------------------------------

export default CheckGroup 
