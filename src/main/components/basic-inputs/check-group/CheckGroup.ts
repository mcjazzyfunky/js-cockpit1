// external imports
import { component, withDefaultProps } from 'js-react-utils'

// internal imports
import CheckGroupProps from './types/CheckGroupProps'
import CheckGroupView from './view/CheckGroupView'
import validateCheckGroup from './validate/validateCheckGroupProps'
import defaultCheckGroupProps from './defaults/defaultCheckGroupProps'

// --- CheckGroup ---------------------------------------------------

const CheckGroup = component<CheckGroupProps>({
  displayName: 'CheckGroup',
  validate: validateCheckGroup,
  render: withDefaultProps(defaultCheckGroupProps, CheckGroupView)
})

// --- exports ------------------------------------------------------

export default CheckGroup 
