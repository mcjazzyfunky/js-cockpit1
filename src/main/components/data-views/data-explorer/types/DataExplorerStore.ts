// external imports
import { Observable } from 'rxjs'

// internal imports
import DataExplorerFilter from './DataExplorerFilter'
import DataExplorerQueryParams from './DataExplorerQueryParams'
import DataExplorerQueryResult from './DataExplorerQueryResult'

// -- DataExplorerStore --------------------------------------------

type DataExplorerStore = {
  isInitialized: boolean,
  isLoading: boolean,
  errorMessage: string | null,
  pageIndex: number,
  pageSize: number,
  sortBy: string | null,
  sortDir: 'asc' | 'desc',
  filter: DataExplorerFilter | null,
  totalItemCount: number | null,
  rowSelection: number[],
  data: any[],

  setRowSelection(
    rowSelection: number[]
  ): void,
  
  loadPage(
    pageIndex: number,
    loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
    onSuccess: () => void
  ): void,

  loadPageSize(
    pageSize: number,
    loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
    onSuccess: () => void
  ): void,

  loadSorting(
    sortBy: string,
    sortDir: 'asc' | 'desc',
    loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
    onSuccess: () => void
  ): void,

  loadFilter(
    filter: DataExplorerFilter | null,
    loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
    onSuccess: () => void
  ): void
}

// --- exports ------------------------------------------------------

export default DataExplorerStore
