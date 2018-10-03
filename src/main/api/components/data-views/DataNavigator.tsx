import React from 'react'
import { defineComponent, withChildren } from 'js-react-utils'
import DataNavigatorRenderer from '../../../renderers/DataNavigator/DataNavigatorRenderer'

// --- DataNavigator ------------------------------------------------

type DataNavigatorProps = {
  config: {

  },

  data: any[]
}

const DataNavigator = defineComponent<DataNavigatorProps>({
  displayName: 'DataNavigator',

  properties: {
    config: {

    },

    data: {
      type: Array,
      nullable: true
    },
  },

  base: class Base extends React.PureComponent {
    render() {
      const model: Model_DataNavigator = {
      }

      return DataNavigatorRenderer.render(model)
    }
  } 
}) 

// --- modesl -------------------------------------------------------

type Model_DataNavigator = {
}

// --- exports ------------------------------------------------------

export default DataNavigator

export {
  Model_DataNavigator
}
