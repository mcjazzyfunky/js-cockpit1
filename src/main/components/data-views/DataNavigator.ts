import React from 'react'
import { defineComponent, withChildren } from 'js-react-utils'
import DataNavigatorRenderer from './DataNavigatorRenderer'

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
      const model: DataNavigatorModel = {
      }

      return DataNavigatorRenderer.render(model)
    }
  } 
}) 

// --- modesl -------------------------------------------------------

type DataNavigatorModel = {
}

// --- exports ------------------------------------------------------

export default DataNavigator

export {
  DataNavigatorModel
}
