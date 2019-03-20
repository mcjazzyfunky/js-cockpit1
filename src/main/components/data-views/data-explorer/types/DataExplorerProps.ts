// external imports
import { ReactNode } from 'react'
import { Observable } from 'rxjs'

// internal imports
import DataExplorerColumn from './DataExplorerColumn'
import DataExplorerDefaultAction from './DataExplorerDefaultAction'
import DataExplorerSingleRowAction from './DataExplorerSingleRowAction'
import DataExplorerMultiRowAction from './DataExplorerMultiRowAction'
import DataExplorerSearch from './DataExplorerSearch'
import DataExplorerQueryParams from './DataExplorerQueryParams'
import DataExplorerQueryResult from './DataExplorerQueryResult'

// --- DataExplorerProps ----------------------------------------------

type DataExplorerProps = {
  title?: string | null,
  loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>, // TODO
  columns: DataExplorerColumn[],

  actions:
    (DataExplorerDefaultAction
      | DataExplorerSingleRowAction
      | DataExplorerMultiRowAction)[],

  search?: DataExplorerSearch | null
}

// --- exports ------------------------------------------------------

export default DataExplorerProps
