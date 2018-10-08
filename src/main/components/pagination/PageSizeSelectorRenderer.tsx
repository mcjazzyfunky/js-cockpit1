// internal imports
import { PAGE_SIZE_OPTIONS, PageSizeSelectorModel } from './PageSizeSelector'
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
            items: PAGE_SIZE_OPTIONS.map(option => ({
              key: String(option),
              name: String(option),

              onClick:
                model.onAction
                  ? (ev: any) => emitActionEvent(option, model.onAction)
                  : null
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
