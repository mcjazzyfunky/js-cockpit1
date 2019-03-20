import DataExplorerFilterInput from './DataExplorerFilterInput'

type DataExplorerDefaultSearch = {
  type: 'default',

  basic: {
    type: 'fullText',
    name: string
  },

  advanced: {
    type: 'filters',
    filters: DataExplorerFilterInput[]
  }
}

export default DataExplorerDefaultSearch