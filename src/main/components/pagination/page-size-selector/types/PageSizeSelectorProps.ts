// internal imports
import PageSizeChangeEvent from '../../../../events/PageSizeChangeEvent'

// --- PageSizeSelectorProps -----------------------------------------

type PageSizeSelectorProps = {
  pageSize?: number,
  onPageSizeChange?: (event: PageSizeChangeEvent) => void
}

// --- exports -------------------------------------------------------

export default PageSizeSelectorProps
