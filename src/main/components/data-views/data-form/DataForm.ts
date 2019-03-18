// external imports
import React from 'react'
import { defineComponent, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import DataFormProps from './types/DataFormProps'
import DataFormCtrl from './ctrl/DataFormCtrl'
import renderDataForm from './view/renderDataForm'
import useForceUpdate from '../../../hooks/useForceUpdate'

// derived imports
const { useEffect, useState } = React

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
    const
      forceUpdate = useForceUpdate(),

      [ctrl] = useState(() => {
        const ret = new DataFormCtrl
        
        ret.setValues({
          firstName: 'Jane',
          lastName: 'Doe',
          postalCode: '12345',
          city: 'New York',
          country: 'US'
        }, true)
        
        ret.subscribe(() => forceUpdate())

        return ret
      })

    /*
    ctrl.subscribe((values, tempValues) => {
      console.log('\n--- values ---')
      console.log(values)
      console.log('--- tempValues ---')
      console.log(tempValues)
    })
    */

    return renderDataForm(props, ctrl)
  }
})

// --- exports ------------------------------------------------------

export default DataForm
