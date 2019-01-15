// internal imports
import PageChangeEvent from '../../../events/PageChangeEvent'

// --- PaginatorProps -----------------------------------------------

type PaginatorProps = {
  pageIndex: number,
  pageSize: number,
  totalItemCount: number,
  onPageChange?: (event: PageChangeEvent) => void 
}

// exports ----------------------------------------------------------

export default PaginatorProps
