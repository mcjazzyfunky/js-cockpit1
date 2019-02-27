// external imports
import { initStore } from 'js-react-store'
import { Observable } from 'rxjs'
import { take  } from 'rxjs/operators'
import QueryParams from './QueryParams'
import QueryResult from './QueryResult'

// internal imports
import DataExplorerStore from './DataExplorerStore'

// ---createStore ----------------------------------------------------

function createStore(): DataExplorerStore {
  let timeout: any

  const [self, update] = initStore<DataExplorerStore>({
    isInitialized: false,
    isLoading: false,
    data: [],
    pageIndex: 0,
    pageSize: 50,
    totalItemCount: null,
    sortBy: null,
    sortDesc: false,
    rowSelection: [],
    errorMessage: null,

    setRowSelection(rowSelection) {
      update(() => {
        self.rowSelection = rowSelection
      })
    },

    loadPage(pageIndex, loadData, onSuccess) {
      return fetchData({
        pageIndex,
        pageSize: self.pageSize,
        sortBy: self.sortBy,
        sortDesc: self.sortDesc,
        loadData,
        onSuccess
      })
    },

    loadPageSize(pageSize, loadData, onSuccess) {
      fetchData({
        pageIndex: 0,
        pageSize,
        sortBy: self.sortBy,
        sortDesc: self.sortDesc,
        loadData,
        onSuccess
      })
    },

    loadSorting(sortBy, sortDesc, loadData, onSuccess) {
      fetchData({
        pageIndex: 0,
        pageSize: self.pageSize,
        sortBy: sortBy,
        sortDesc: sortDesc,
        loadData,
        onSuccess
      })
    }
  })

  function fetchData(params: {
    pageIndex: number,
    pageSize: number,
    sortBy: string | null,
    sortDesc: boolean,
    loadData: (params: QueryParams) => Observable<QueryResult>,
    onSuccess?: () => void
  }) {
    const observer = params.loadData({
      offset: params.pageIndex * params.pageSize,
      count: params.pageSize,
      sortBy: params.sortBy,
      sortDesc: params.sortDesc 
    }).pipe(take(1))

    timeout = setTimeout(() => {
      clearTimeout(timeout)
      
      update(() => {
        self.isLoading =true
      })
    }, 100)

    const subscription = observer.subscribe({
      next: (result: any) => {
        update(() => {
          self.isLoading = false,
          self.errorMessage = null,
          self.pageIndex = params.pageIndex,
          self.pageSize = params.pageSize,
          self.sortBy = params.sortBy,
          self.sortDesc = params.sortDesc,
          self.isInitialized = true,
          self.data = result.data,
          self.totalItemCount = result.totalItemCount,
          self.rowSelection = []
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
         update(() => {
          self.isLoading = false,
          self.errorMessage = String(e) // TODO
        })
      }
    })
  }

  return self
}

// --- exports ------------------------------------------------------

export default createStore
