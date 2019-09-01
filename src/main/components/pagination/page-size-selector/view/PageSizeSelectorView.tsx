// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { DefaultButton, ITheme } from 'office-ui-fabric-react'

// internal imports
import stylePageSizeSelector from './stylePageSizeSelector'
import { PAGE_SIZE_OPTIONS } from '../../misc/constants'
import PageSizeSelectorViewProps from '../types/PageSizeSelectorViewProps'

// --- PageSizeSelectorView -----------------------------------------

const PageSizeSelectorView = component<PageSizeSelectorViewProps>(
  'PageSizeSelectorView', props => {
  
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
})

// --- exports ------------------------------------------------------

export default PageSizeSelectorView
