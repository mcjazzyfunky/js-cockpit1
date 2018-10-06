import defineRenderer from '../defineRenderer'
import { PaginatorData } from '../../api/components/pagination/Paginator'

// --- PaginatorRenderer --------------------------------------------

const PaginatorRenderer = defineRenderer((data: PaginatorData) => {
  return '[Paginator]'
})

// --- exports ------------------------------------------------------

export default PaginatorRenderer
