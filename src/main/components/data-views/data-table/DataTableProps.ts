// external imports
import { ReactNode } from 'react'

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
  sortDesc?: boolean,

  data: object[],
  children?: ReactNode,

  onRowSelectionChange?: (event: RowSelectionChangeEvent) => void
  onSortChange?: (event: SortChangeEvent) => void
}

// --- exports ------------------------------------------------------

export default DataTableProps
