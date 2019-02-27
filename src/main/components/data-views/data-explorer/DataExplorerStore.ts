// external imports
import { Observable } from 'rxjs'

// internal imports
import QueryParams from './QueryParams'
import QueryResult from './QueryResult'

// -- DataExplorerStore ---------------------------------------------

type DataExplorerStore = {
  isInitialized: boolean,
  isLoading: boolean,
  errorMessage: string | null,
  pageIndex: number | null,
  pageSize: number,
  sortBy: string | null,
  sortDesc: boolean,
  totalItemCount: number | null,
  rowSelection: number[],
  data: any[],

  setRowSelection(
    rowSelection: number[]
  ): void,
  
  loadPage(
    pageIndex: number,
    loadData: (params: QueryParams) => Observable<QueryResult>,
    onSuccess: () => void
  ): void,

  loadPageSize(
    pageSize: number,
    loadData: (params: QueryParams) => Observable<QueryResult>,
    onSuccess: () => void
  ): void,

  loadSorting(
    sortBy: string,
    sortDesc: boolean,
    loadData: (params: QueryParams) => Observable<QueryResult>,
    onSuccess: () => void
  ): void
}

// --- exports ------------------------------------------------------

export default DataExplorerStore
