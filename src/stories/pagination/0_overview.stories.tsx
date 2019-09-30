import React from 'react'

import {Paginator, PaginationInfo, PaginationProvider, PaginationCtrl }
  from '../js-cockpit'

export default {
  title: 'Pagination'
}

const paginationCtrl: PaginationCtrl = {
  getPageIndex: () => 3,
  getPageSize: () => 50,
  getTotalItemCount: () => 1234,
  moveToPage: () => Promise.resolve(1),
  setPageSize: () => Promise.resolve(50)
}


export const overview = () =>
  <PaginationProvider value={paginationCtrl}>
    <h3>Paginator:</h3>
    <section>
      <Paginator/>
    </section>
    <h3>PaginationInfo:</h3>
    <section>
      <PaginationInfo about="items"/>
    </section>
  </PaginationProvider>