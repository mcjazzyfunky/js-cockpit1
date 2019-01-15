// external imports
import React from 'react'
import { DefaultButton, ITheme } from 'office-ui-fabric-react'

// internal imports
import { PAGE_SIZE_OPTIONS } from './constants'
import PageSizeSelectorProps from './PageSizeSelectorProps'
import defineStyle from '../../styling/defineStyle' 
import ActionEvent from '../../events/ActionEvent'

// --- PageSizeSelectorStyle ----------------------------------------

const stylePageSizeSelector = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  },

  pageSizeText: {
    marginRight: '0.75rem'
  }
}))

// --- PageSizeSelectorView -----------------------------------------

function PageSizeSelectorView(props: PageSizeSelectorProps) {
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

export default PageSizeSelectorView
