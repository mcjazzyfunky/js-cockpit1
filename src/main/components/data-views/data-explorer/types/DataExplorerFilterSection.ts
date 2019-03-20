import DataExplorerFilterSet from './DataExplorerFilterSet'

type DataExplorerFilterSection = {
  type: 'section',
  title?: string,
  contents: DataExplorerFilterSet[]
}

export default DataExplorerFilterSection
