// internal imports
import DataTableColumn from './DataTableColumn'
import RowSelectionChangeEvent from '../../../../events/RowSelectionChangeEvent'
import SortChangeEvent from '../../../../events/SortChangeEvent'

// --- DataTableProps -----------------------------------------------

type DataTableProps = {
  title?: string | null,
  
  rowSelectionOptions?: {
    mode: 'none' | 'single' | 'multi'
  } | null,

  sortBy?: string | null,
  sortDir?: 'asc' | 'desc',

  columns: {
    title: string, 
    field?: string | null,
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
