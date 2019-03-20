import DataExplorerFilterInput from './DataExplorerFilter'

type DataExplorerFilterSet = {
  type: 'filterSet',
  title?: string,
  filters: DataExplorerFilterInput[]
}

export default DataExplorerFilterSet
