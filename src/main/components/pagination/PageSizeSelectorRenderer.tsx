// internal imports
import { PageSizeSelectorModel } from './PageSizeSelector'
import defineStyle from '../../styling/defineStyle' 
import ActionEvent from '../../events/ActionEvent'

// external imports
import React from 'react'
import { DefaultButton, ITheme } from 'office-ui-fabric-react'

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

// --- PageSizeSelectorRenderer -------------------------------------

const PageSizeSelectorRenderer = {
  render(model: PageSizeSelectorModel) {
    return stylePageSizeSelector(classes =>
      <div className={classes.container}>
        <label className={classes.pageSizeText}>Items/Page</label>
        <DefaultButton
          text={String(model.pageSize)}

          menuProps={{
            items: model.pageSizeOptions.map(option => ({
              key: String(option),
              name: String(option),

              onClick() {
                model.api.changePageSize(option)
              }
            }))
          }}
        />
      </div>
    )
  }
}

// --- helpers -----------------------------------------------------

function emitActionEvent(pageSize: number, onAction: (event: ActionEvent<number>) => void) {
  onAction({
    type: 'action',
    name: 'pageSize',
    value: pageSize
  })
}

// --- exports ------------------------------------------------------

export default PageSizeSelectorRenderer
