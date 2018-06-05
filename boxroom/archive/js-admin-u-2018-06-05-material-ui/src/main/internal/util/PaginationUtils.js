export default {
  preparePaginationFacts(pageIndex, pageSize, totalItemCount, otherDetails = null) {
    const ret = {...otherDetails};

    ret.pageIndex =
      pageIndex === null || isNaN(pageIndex) || pageIndex < 0
        ? null
        : Math.max(0, parseInt(pageIndex, 10));

    ret.pageSize = pageSize === null || isNaN(pageSize) || pageSize < 1
       ? null
       : Math.floor(pageSize);

    ret.totalItemCount =
      totalItemCount === null || isNaN(totalItemCount) || totalItemCount < 0
        ? null
        : Math.max(0, Number.parseInt(totalItemCount, 10));

    ret.pageCount = (ret.totalItemCount == null || ret.pageSize == null)
        ? null
        : Math.ceil(ret.totalItemCount / ret.pageSize);

    ret.isFirstPage = ret.pageIndex === 0;

    ret.isLastPage = ret.pageCount > 0 && ret.pageCount === ret.pageIndex + 1;

    ret.valid =
      ret.pageIndex >= 0
        && ret.pageCount >= 0
        && ret.pageSize > 0;

    return ret;
  },

  determineVisiblePageButtons(pageIndex, pageCount, maxPageButtonCount) {
    const
      pageNumber = pageIndex + 1,
      pageButtonCount = Math.min(maxPageButtonCount, pageCount);

    let
      firstPageNumber,
      lastPageNumber;

    if (pageButtonCount === pageCount || pageNumber <= Math.round(pageButtonCount / 2)) {
      firstPageNumber = 2;
    } else if (pageCount - pageNumber < Math.round(pageButtonCount / 2)) {
      firstPageNumber = pageCount - pageButtonCount + 2;
    } else {
      firstPageNumber = pageNumber - Math.round(pageButtonCount / 2) + 2;
    }

    lastPageNumber = firstPageNumber + pageButtonCount - 3;

    return {
      pageButtonCount: pageButtonCount,
      firstButtonIndex: firstPageNumber - 1,
      lastButtonIndex: lastPageNumber - 1,
      maxPageButtonCount
    };
  }
};