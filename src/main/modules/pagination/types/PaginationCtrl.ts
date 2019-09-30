// --- PaginationCtrl -----------------------------------------------

type PaginationCtrl = {
  getPageIndex(): number,
  getPageSize(): number,
  getTotalItemCount(): number,
  moveToPage(pageIndex: number): Promise<number>, 
  setPageSize(pageIndex: number): Promise<number>
}

// --- exports ------------------------------------------------------

export default PaginationCtrl
