// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { Label } from 'office-ui-fabric-react'

// internal imports
import getDataExplorerFilterPanelClasses from './getDataExplorerFilterPanelClasses'
import DataExplorerTextFilter from './DataExplorerTextFilter'
import DataExplorerFilterInput from '../types/DataExplorerFilterInput'

// --- DataExplorerFilterPanel --------------------------------------

type DataExplorerFilterPanelProps = {
  filters: DataExplorerFilterInput[]
}

const DataExplorerFilterPanel = component<DataExplorerFilterPanelProps>({
  displayName: 'DataExplorerFilterPanel',

  render({ filters }) {
    const classes = getDataExplorerFilterPanelClasses()

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
  }
})

// --- exports ------------------------------------------------------

export default DataExplorerFilterPanel
