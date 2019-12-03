// external imports
import React from 'react'
import { DefaultButton } from 'office-ui-fabric-react'
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'

// internal imports
import defineStyles from '../../../styling/defineStyles'
import usePagination from '../hooks/usePagination'

// --- constants -----------------------------------------------------

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 250, 500]

// --- components ----------------------------------------------------

const PageSizeSelector = component<PageSizeSelectorProps>({
  displayName: 'PageSizeSelctor',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validatePageSizeSelectorProps) },

  
  render: PageSizeSelectorView
})

// --- types ---------------------------------------------------------

type PageSizeSelectorProps = {
}

// --- validation ----------------------------------------------------

const validatePageSizeSelectorProps = Spec.checkProps({
})

// --- views ---------------------------------------------------------

function PageSizeSelectorView({
}: PageSizeSelectorProps) {
  const
    classes = getPageSizeSelectorClasses(),
    ctrl = usePagination()

  return (
    <div className={classes.container}>
      <label className={classes.pageSizeText}>Items/Page</label>
      <DefaultButton
        text={String(ctrl.getPageSize())}

        menuProps={{
          items: PAGE_SIZE_OPTIONS.map(option => ({
            key: String(option),
            name: String(option),

            onClick() {
              ctrl.setPageSize(option)
            }
          }))
        }}
      />
    </div>
  )
}

// ---- styles -------------------------------------------------------

const getPageSizeSelectorClasses = defineStyles(theme => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      ...theme.fonts.medium
    },

    pageSizeText: {
      marginRight: '0.75rem'
    }
  }
})


// --- exports -------------------------------------------------------

export default PageSizeSelector
