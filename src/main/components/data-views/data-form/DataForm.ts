// external imports
import { ComponentType } from 'react'
import { defineComponent, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataFormProps from './types/DataFormProps'
import renderDataForm from './view/renderDataForm'

// --- DataForm -----------------------------------------------------

const DataForm = defineComponent<DataFormProps>({
  displayName: 'DataForm',

  properties: {
    title: {
      type: String,
      required: true
    },

    actions: {
      type: Array,

      validate:
        Spec.arrayOf(
          Spec.and(
            Spec.prop('type', Spec.oneOf('default')),
            Spec.or({
              when: Spec.prop('type', Spec.is('default')),

              then:
                Spec.strictShape({
                  type: Spec.is('default'),
                  text: Spec.string,
                  icon: Spec.optional(isNode)
                })
            })
          )
        )
    },

    onClose: {
      type: Function
    },

    children: {
      validate:
        withChildren(isNode)
    }
  },

  render(props) {
    return renderDataForm(props)
  }
})

// --- exports ------------------------------------------------------

export default DataForm
