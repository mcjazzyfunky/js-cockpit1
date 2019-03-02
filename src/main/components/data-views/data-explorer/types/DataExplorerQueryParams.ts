// --- DataExplorerQueryParams -------------------------------------

type DataExplorerQueryParams = {
  offset: number,
  count: number,
  sortBy: string | null,
  sortDir: 'asc' | 'desc',
  
  filter?: {
    operator: 'and',
    operands: { type: 'default', name: string, value: any }[]
  }
}

// --- exports ------------------------------------------------------

export default DataExplorerQueryParams
