// external imports
import React from 'react'
import { DefaultButton, ITheme } from 'office-ui-fabric-react'

// internal imports
import stylePageSizeSelector from './stylePageSizeSelector'
import { PAGE_SIZE_OPTIONS } from '../../misc/constants'
import PageSizeSelectorProps from '../types/PageSizeSelectorProps'

// --- renderPageSizeSelector ---------------------------------------

function renderPageSizeSelector(props: PageSizeSelectorProps) {
  return stylePageSizeSelector(classes =>
    <div className={classes.container}>
      <label className={classes.pageSizeText}>Items/Page</label>
      <DefaultButton
        text={String(props.pageSize)}

        menuProps={{
          items: PAGE_SIZE_OPTIONS.map(option => ({
            key: String(option),
            name: String(option),

            onClick() {
              if (props.onPageSizeChange) {
                props.onPageSizeChange({ type: 'pageSizeChange', pageSize: option })
              }
            }
          }))
        }}
      />
    </div>
  )
}

// --- exports ------------------------------------------------------

export default renderPageSizeSelector
