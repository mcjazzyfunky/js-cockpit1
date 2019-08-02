// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import CheckGroupProps from './types/CheckGroupProps'
import renderCheckGroup from './view/renderCheckGroup'

// --- CheckGroup ---------------------------------------------------

const CheckGroup = defineComponent<CheckGroupProps>({
  displayName: 'CheckGroup',

  validate: Spec.checkProps({
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
      grow: Spec.number,

    }
  }),

  render(props) {
    return renderCheckGroup(props)
  }
})

// --- exports ------------------------------------------------------

export default CheckGroup 
