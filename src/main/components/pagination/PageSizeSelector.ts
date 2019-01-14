// internal imports
import PageSizeSelectorRenderer from './PageSizeSelectorRenderer'
import PageSizeChangeEvent from '../../events/PageSizeChangeEvent'

// external imports
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- constants ----------------------------------------------------

const PAGE_SIZE_OPTIONS = [25, 50, 100, 250, 500]

// --- PageSizeSelector ---------------------------------------------

type PageSizeSelectorProps = {
  pageSize: number,
  onPageSizeChange?: (event: PageSizeChangeEvent) => void
}

const PageSizeSelector = defineComponent<PageSizeSelectorProps>({
  displayName: 'PageSizeSelector',

  properties: {
    pageSize: {
      type: Number,
      required: true,
      validate: Spec.in(PAGE_SIZE_OPTIONS)
    },

    onPageSizeChange: {
      type: Function
    }
  },

  render(props: PageSizeSelectorProps) {
    return PageSizeSelectorRenderer.render(getPageSizeSelectorModel(props))
  }
})

// --- helpers ------------------------------------------------------

function getPageSizeSelectorModel(props: PageSizeSelectorProps): PageSizeSelectorModel {
  return {
    $kind: 'PageSizeSelectorModel',
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    pageSize: props.pageSize,

    api: {
      changePageSize: (pageSize: number): void => {
        if (props.onPageSizeChange) {
          props.onPageSizeChange({
            type: 'pageSizeChange',
            pageSize
          })
        }
      }
    }
  }
}

// --- models -------------------------------------------------------

type PageSizeSelectorModel = {
  $kind: 'PageSizeSelectorModel',
  pageSizeOptions: number[],
  pageSize: number,

  api: {
    changePageSize(pageSize: number): void
  }
}

// --- exports ------------------------------------------------------

export default PageSizeSelector

export {
  PageSizeSelectorModel
}
