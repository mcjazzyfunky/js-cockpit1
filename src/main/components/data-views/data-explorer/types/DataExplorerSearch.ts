type DataExplorerSearch = {
  type: 'default',

  basic: {
    type: 'fullText',
    name: string
  },

  advanced: {
    type: 'filters',

    filters: (TextFilter)[]
  }
}

type TextFilter = {
  type: 'text',
  name: string,
  label: string
}

// --- exports ------------------------------------------------------

export default DataExplorerSearch
