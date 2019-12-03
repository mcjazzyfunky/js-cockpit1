import createNotifier from '../../../tools/createNotifier'
import PaginationCtrl from '../types/PaginationCtrl'
import PaginationParams from '../types/PaginationParams'

export default function createPaginationCtrl({
  pageIndex,
  pageSize,
  totalItemCount,
  update
}: PaginationCtrlInitParams): [PaginationCtrl, (params: PaginationParams) => void] {
  let
    currPageIndex = pageIndex,
    currPageSize = pageSize,
    currTotalItemCount = totalItemCount

  const notifier = createNotifier()

  const setValues = (params: PaginationParams) => {
    currPageIndex = params.pageIndex
    currPageSize = params.pageSize
    currTotalItemCount = params.totalItemCount
    notifier.notify(null)
  }

  const ctrl: PaginationCtrl = {
    getPageIndex: () => currPageIndex,
    getPageSize: () => currPageSize,
    getTotalItemCount: () => currTotalItemCount,

    moveToPage(pageIndex) {
      if (pageIndex >= 0 && pageIndex <= (totalItemCount - 1) / currPageSize) {
        update(pageIndex, currPageSize)
      }
    },
    
    setPageSize(pageSize: number) {
      if (pageSize === Math.floor(pageSize) && pageSize > 0) {
        update(currPageIndex, pageSize)
      }
    },

    subscribe(subscriber: () => void): () => void {
      return notifier.subscribe(subscriber)
    }
  }

  return [ctrl, setValues]
}

// --- types ---------------------------------------------------------

type PaginationCtrlInitParams = {
  pageIndex: number,
  pageSize: number,
  totalItemCount: number,
  update(pageIndex: number, pageSize: number): void,
}
