// internal imports
import DataExplorerFilter from './DataExplorerFilter'

// --- DataExplorerQueryParams -------------------------------------

type DataExplorerQueryParams = {
  offset: number,
  count: number,
  sortBy: string | null,
  sortDir: 'asc' | 'desc',
  filter: DataExplorerFilter | null  
}

// --- exports ------------------------------------------------------

export default DataExplorerQueryParams
