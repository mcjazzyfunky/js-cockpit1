// external imports
import { ReactElement } from 'react'

// internal imports
import DataTable from './DataTable'
import DataTableColumnProps from './DataTableColumnProps'
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

  columns: ReactElement<DataTableColumnProps>[], // TODO - second type parameter?

  data: object[],

  onRowSelectionChange?: (event: RowSelectionChangeEvent) => void
  onSortChange?: (event: SortChangeEvent) => void
}

// --- exports ------------------------------------------------------

export default DataTableProps
