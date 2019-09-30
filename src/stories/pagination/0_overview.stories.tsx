// imports
import React from 'react'

import { Paginator, PaginationInfo, PaginationProvider, PaginationCtrl }
  from '../js-cockpit'


// derived imports
const { useState } = React

// --- stories ------------------------------------------------------

export default {
  title: 'Pagination'
}

const pageSizeOptions = [10, 25, 50, 100, 250, 500]

function createPaginationCtrl(totalItemCount: number, onUpdate: () => void): PaginationCtrl {
  let
    currPageIndex = 0,
    currPageSize = 50
  
  return {
    getPageIndex: () => currPageIndex,
    getPageSize: () => currPageSize,
    getTotalItemCount: () => totalItemCount,

    moveToPage(pageIndex) {console.log(pageIndex)
      if (pageIndex >= 0 && pageIndex <= (totalItemCount - 1) / currPageSize) {
        currPageIndex = pageIndex
        setTimeout(onUpdate, 0)
      }

      return Promise.resolve(currPageIndex)
    },
    
    setPageSize(pageSize: number) {
      if (pageSizeOptions.includes(pageSize)) {
        currPageSize = pageSize
        setTimeout(onUpdate, 0)
      }

      return Promise.resolve(currPageSize)
    }
  }
}

export const overview = () => {
  const
    [, setDummy] = useState(false),

    [paginationCtrl] = useState(() => createPaginationCtrl(1245, () => {
      setDummy(dummy => !dummy)
    }))

  return (
    <PaginationProvider controller={paginationCtrl}>
      <h3>Paginator:</h3>
      <section>
        <Paginator/>
      </section>
      <h3>PaginationInfo:</h3>
      <section>
        <PaginationInfo about="items"/>
      </section>
    </PaginationProvider>
  )
}
