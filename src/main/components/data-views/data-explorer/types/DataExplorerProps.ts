// external imports
import { ReactNode } from 'react'
import { Observable } from 'rxjs'

// internal imports
import DataExplorerQueryParams from './DataExplorerQueryParams'
import DataExplorerQueryResult from './DataExplorerQueryResult'

// --- DataExplorerProps ----------------------------------------------

type DataExplorerProps = {
  title?: string,
  loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>, // TODO
  columns: Column[],
  actions: (GeneralAction | SingleRowAction | MultiRowAction)[],

  search?: {
    type: 'default',

    basic: {
      type: 'fullText',
      name: string
    },

    advanced: {
      type: 'filters',

      filters: (TextFilter)[]
    }
  }
}

type Column = {
  type: 'column',
  title: string,
  field?: string,
  align?: 'start' | 'center' | 'end'
  sortable?: boolean,
  width?: number
}

type GeneralAction = {
  type: 'general',
  title: string,
  icon?: ReactNode
}

type SingleRowAction = {
  type: 'singleRow',
  title: string,
  icon?: ReactNode
}

type MultiRowAction = {
  type: 'multiRow',
  title: string,
  icon?: ReactNode
}
type TextFilter = {
  type: 'text',
  name: string,
  label: string
}

// --- exports ------------------------------------------------------

export default DataExplorerProps
