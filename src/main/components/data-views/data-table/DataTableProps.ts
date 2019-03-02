// internal imports
import RowSelectionChangeEvent from '../../../events/RowSelectionChangeEvent'
import SortChangeEvent from '../../../events/SortChangeEvent'

// --- DataTableProps -----------------------------------------------

type DataTableProps = {
  title?: string,
  
  rowSelectionOptions?: {
    mode: 'none' | 'single' | 'multi'
  },

  sortBy?: string,
  sortDir?: 'asc' | 'desc',

  columns: {
    title: string, 
    field?: string,
    align?: 'start' | 'center' | 'end',
    width?: number,
    sortable?: boolean
  }[],

  data: object[],

  onRowSelectionChange?: (event: RowSelectionChangeEvent) => void
  onSortChange?: (event: SortChangeEvent) => void
}

// --- exports ------------------------------------------------------

export default DataTableProps
