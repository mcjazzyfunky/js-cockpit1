// external imports
import { ReactNode } from 'react'
import { Observable } from 'rxjs'

// internal imports
import DataExplorerQueryParams from './DataExplorerQueryParams'
import DataExplorerQueryResult from './DataExplorerQueryResult'
import DataExplorerSearch from './DataExplorerSearch'

// --- DataExplorerProps ----------------------------------------------

type DataExplorerProps = {
  title?: string,
  loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>, // TODO
  columns: TColumn[],
  actions: (TGeneralAction | TSingleRowAction | TMultiRowAction)[],
  search?: DataExplorerSearch
}

type TColumn = {
  type: 'column',
  title: string,
  field?: string,
  align?: 'start' | 'center' | 'end'
  sortable?: boolean,
  width?: number
}

type TGeneralAction = {
  type: 'general',
  title: string,
  icon?: ReactNode
}

type TSingleRowAction = {
  type: 'singleRow',
  title: string,
  icon?: ReactNode
}

type TMultiRowAction = {
  type: 'multiRow',
  title: string,
  icon?: ReactNode
}

// --- exports ------------------------------------------------------

export default DataExplorerProps
