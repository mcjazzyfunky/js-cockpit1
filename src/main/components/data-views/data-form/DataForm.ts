// external imports
import { ComponentType } from 'react'
import { defineComponent, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataFormProps from './types/DataFormProps'
import DataFormCtrl from './ctrl/DataFormCtrl'
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

    compact: {
      type: Boolean,
      defaultValue: false
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
    const ctrl = new DataFormCtrl

    ctrl.subscribe((values, tempValues) => {
      console.log('\n--- values ---')
      console.log(values)
      console.log('--- tempValues ---')
      console.log(tempValues)
    })
    
    return renderDataForm(props, ctrl)
  }
})

// --- exports ------------------------------------------------------

export default DataForm
