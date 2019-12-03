// --- PaginationCtrl ------------------------------------------------

type PaginationCtrl = {
  getPageIndex(): number,
  getPageSize(): number,
  getTotalItemCount(): number,
  moveToPage(pageIndex: number): void, 
  setPageSize(pageIndex: number): void,
  subscribe(subscriber: () => void): () => void
}

// --- exports -------------------------------------------------------

export default PaginationCtrl
