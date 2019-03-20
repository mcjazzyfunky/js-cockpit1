import DataExplorerFilterInput from './DataExplorerFilterInput'

type DataExplorerFilterSet = {
  type: 'filterSet',
  title?: string,
  filters: DataExplorerFilterInput[]
}

export default DataExplorerFilterSet
