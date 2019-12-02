// -- DataExplorerFilter ---------------------------------------------

type DataExplorerFilter = {
  operator: 'and',
  operands: { type: 'default', name: string, value: any }[]
}

 // --- exports ------------------------------------------------------

 export default DataExplorerFilter
