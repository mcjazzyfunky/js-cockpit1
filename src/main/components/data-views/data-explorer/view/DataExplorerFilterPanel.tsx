// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { TextField } from 'office-ui-fabric-react'

// internal imports
import styleDataExplorerFilterPanel from './styleDataExplorerFilterPanel'
import DataExplorerProps from '../types/DataExplorerProps'
import DataExplorerStore from '../types/DataExplorerStore'

// --- DataExplorerFilterPanel --------------------------------------

type DataExplorerFilterPanelProps = {
  dataExplorerProps: DataExplorerProps,
  dataExplorerStore: DataExplorerStore
}

const DataExplorerFilterPanel = defineComponent<DataExplorerFilterPanelProps>({
  displayName: 'FilterPanel',

  render({ dataExplorerProps: props, dataExplorerStore: store }) {
    return styleDataExplorerFilterPanel(classes => {
      const rows = props.search.advanced.filters.map(filter => {
        let filterField: any = null // TODO

        switch (filter.type) {
          case 'text':
             filterField = createTextFilter({ classes })
             break
        }

        return (
          <tr>
            <td className={classes.labelCell}>
              <label>{filter.label}</label>
            </td>
            <td className={classes.fieldCell}>
              {filterField}
            </td>
          </tr>
        )
      })

      return (
        <div className={classes.container}>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      )
    })
  }
})

// --- createTextFilter ---------------------------------------------

function createTextFilter({ classes }: any) { // TODO
  return <TextField className={classes.textFilter} />
}

// --- exports ------------------------------------------------------

export default DataExplorerFilterPanel
