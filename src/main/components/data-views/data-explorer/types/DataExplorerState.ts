import DataExplorerFilter from './DataExplorerFilter'

// --- DataExplorerState --------------------------------------------

type DataExplorerState = {
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
  data: any[]
}

// --- exports ------------------------------------------------------

export default DataExplorerState
