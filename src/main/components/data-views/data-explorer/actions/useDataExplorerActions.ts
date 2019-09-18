// external imports
import { Observable } from 'rxjs'
import { take  } from 'rxjs/operators'

// internal imports
import defineComponentActions from '../../../../tools/defineComponentActions'
import DataExplorerState from '../types/DataExplorerState'
import DataExplorerFilter from '../types/DataExplorerFilter'
import DataExplorerQueryParams from '../types/DataExplorerQueryParams'
import DataExplorerQueryResult from '../types/DataExplorerQueryResult'

// -- useDataExplorerActions ----------------------------------------

const useDataExplorerActions = defineComponentActions({
  initState(): DataExplorerState {
    return {
        isInitialized: false,
        isLoading: false,
        data: [],
        pageIndex: 0,
        pageSize: 50,
        totalItemCount: null,
        sortBy: null,
        sortDir: 'asc', 
        filter: null,
        rowSelection: [],
        errorMessage: null
    }
  },

  initActions(state: DataExplorerState, setState) {
    let timeout: any

    return {
      setRowSelection(rowSelection: number[]) {
        setState({ rowSelection })
      },
  
      loadPage(
        pageIndex: number,
        loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
        onSuccess: () => void
      ) {
        fetchData({
          pageIndex,
          pageSize: state.pageSize,
          sortBy:state.sortBy,
          sortDir: state.sortDir,
          filter: state.filter,
          loadData,
          onSuccess
        })
      },

      loadPageSize(
        pageSize: number,
        loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
        onSuccess: () => void
      ): void {
        fetchData({
          pageIndex: 0,
          pageSize,
          sortBy: state.sortBy,
          sortDir: state.sortDir,
          filter: state.filter,
          loadData,
          onSuccess
        })
      },

      loadSorting(
        sortBy: string,
        sortDir: 'asc' | 'desc',
        loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
        onSuccess: () => void
      ) {
        fetchData({
          pageIndex: 0,
          pageSize: state.pageSize,
          sortBy: sortBy,
          sortDir: sortDir,
          filter: state.filter,
          loadData,
          onSuccess
        })
      },

      loadFilter(
        filter: DataExplorerFilter | null,
        loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
        onSuccess: () => void
      ): void {
        fetchData({
          pageIndex: 0,
          pageSize: state.pageSize,
          sortBy: state.sortBy,
          sortDir: state.sortDir,
          filter: filter,
          loadData,
          onSuccess
        })
      }
    }

    function fetchData(params: {
      pageIndex: number,
      pageSize: number,
      sortBy: string | null,
      sortDir: 'asc' | 'desc',
      filter: DataExplorerFilter | null,
      loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
      onSuccess?: () => void
    }) {
      console.log('fetchData:', params)
      const observer = params.loadData({
        offset: params.pageIndex * params.pageSize,
        count: params.pageSize,
        sortBy: params.sortBy,
        sortDir: params.sortDir,
        filter: params.filter
      }).pipe(take(1))

      timeout = setTimeout(() => {
        clearTimeout(timeout)
      
        setState({ isLoading: true })
      }, 100)

      const subscription = observer.subscribe({
        next: (result: any) => {
          setState({
            isLoading: false,
            errorMessage: null,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            sortBy: params.sortBy,
            sortDir: params.sortDir,
            filter: params.filter,
            isInitialized: true,
            data: result.data,
            totalItemCount: result.totalItemCount,
            rowSelection: []
          })

          if (params.onSuccess) {
            params.onSuccess()
          }
        },
        complete: () => {
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
          }
        },
        error: (e: any) => {
          setState({
            isLoading: false,
            errorMessage: String(e) // TODO
          })
        }
      })
    }
  }
})

// --- exports ------------------------------------------------------

export default useDataExplorerActions
