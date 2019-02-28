// external imports
import { ReactNode } from 'react'
import { Observable } from 'rxjs'

// --- DataExplorerProps -----------------------------------------------

type DataExplorerProps = {
  title?: string,
  loadData: (params: QueryParams) => Observable<QueryResult>, // TODO
  columns: Column[],
  actions: (GeneralAction | SingleRowAction | MultiRowAction)[]
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

type QueryResult = {
  data: any[],
  totalItemCount: number
}

type QueryParams = {
  offset: number,
  count: number,
  sortBy: string | null,
  sortDesc: boolean,
}

// --- exports ------------------------------------------------------

export default DataExplorerProps
