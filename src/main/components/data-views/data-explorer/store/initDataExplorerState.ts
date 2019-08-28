// internal imports
import DataExplorerState from '../types/DataExplorerState'

// --- initDataExplorerState ----------------------------------------

function initDataExplorerState(): DataExplorerState {
  return {
    isInitialized: false,
    isLoading: false,
    data: [],
    pageIndex: 0,
    pageSize: 50,
    totalItemCount: null,
    sortBy: null,
    sortDir: 'asc', 
    filter: null,
    rowSelection: [],
    errorMessage: null
  }
}

// --- exports ------------------------------------------------------

export default initDataExplorerState
