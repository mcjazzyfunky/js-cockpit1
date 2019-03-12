// external imports
import { ReactNode } from 'react'
import { Observable } from 'rxjs'

// internal imports
import DataExplorerQueryParams from './DataExplorerQueryParams'
import DataExplorerQueryResult from './DataExplorerQueryResult'

// --- DataExplorerProps ----------------------------------------------

type DataExplorerProps = {
  title?: string | null,
  loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>, // TODO
  columns: Column[],
  actions: (DefaultAction | SingleRowAction | MultiRowAction)[],

  search?: {
    type: 'default',

    basic: {
      type: 'fullText',
      name: string
    }

    advanced: {
      type: 'filters',

      filters: (TextFilter)[]
    }
  } | null
}

type Column = {
  type: 'column',
  title: string,
  field?: string,
  align?: 'start' | 'center' | 'end'
  sortable?: boolean,
  width?: number
}

type DefaultAction = {
  type: 'default',
  text: string,
  icon?: ReactNode
}

type SingleRowAction = {
  type: 'singleRow',
  text: string,
  icon?: ReactNode
}

type MultiRowAction = {
  type: 'multiRow',
  text: string,
  icon?: ReactNode
}
type TextFilter = {
  type: 'text',
  name: string,
  label: string
}

// --- exports ------------------------------------------------------

export default DataExplorerProps
