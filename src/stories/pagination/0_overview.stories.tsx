// imports
import React from 'react'

import { createPaginationCtrl, Paginator, PaginationInfo, PaginationProvider, PaginationCtrl }
  from '../js-cockpit'


// derived imports
const { useState } = React

// --- stories ------------------------------------------------------

export default {
  title: 'Pagination'
}


export const overview = () => {
  let
    currPageIndex = 0,
    currPageSize = 25,
    currTotalItemCount = 1253

  const
    [[paginationCtrl, setValues]] = useState(() => createPaginationCtrl({
      pageIndex: currPageIndex,
      pageSize: currPageSize,
      totalItemCount: currTotalItemCount,

      update(pageIndex, pageCount) {
        console.log(pageIndex, pageCount)

        setTimeout(() => {
          setValues({
            pageIndex: currPageIndex,
            pageSize: currPageSize,
            totalItemCount: currTotalItemCount
          })
        }, 1000)
      }
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
