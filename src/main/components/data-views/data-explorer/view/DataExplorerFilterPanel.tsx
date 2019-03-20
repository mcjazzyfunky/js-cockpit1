// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { Label } from 'office-ui-fabric-react'

// internal imports
import styleDataExplorerFilterPanel from './styleDataExplorerFilterPanel'
import DataExplorerStore from '../types/DataExplorerStore'
import DataExplorerTextFilter from './DataExplorerTextFilter'
import DataExplorerFilterInput from '../types/DataExplorerFilterInput'

// --- DataExplorerFilterPanel --------------------------------------

type DataExplorerFilterPanelProps = {
  filters: DataExplorerFilterInput[],
  store: DataExplorerStore
}

const DataExplorerFilterPanel = defineComponent<DataExplorerFilterPanelProps>({
  displayName: 'DataExplorerFilterPanel',

  render({ filters, store }) {
    return styleDataExplorerFilterPanel(classes => {
      const rows = filters.map((filter: any) => {
        let filterField: any = null // TODO

        switch (filter.type) {
          case 'text':
             filterField = <DataExplorerTextFilter/>
             break
        }

        return (
          <tr>
            <td className={classes.labelCell}>
              <Label>{filter.label}</Label>
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

// --- exports ------------------------------------------------------

export default DataExplorerFilterPanel
