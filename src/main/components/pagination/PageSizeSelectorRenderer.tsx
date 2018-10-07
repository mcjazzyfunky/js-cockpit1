// internal imports
import { PAGE_SIZE_OPTIONS, PageSizeSelectorData } from './PageSizeSelector'
import defineStyle from '../../styling/defineStyle' 
import ActionEvent from '../../events/ActionEvent'

// external imports
import React from 'react'
import { DefaultButton, ITheme } from 'office-ui-fabric-react'

// --- PageSizeSelectorStyle ----------------------------------------

const PageSizeSelectorStyle = defineStyle((theme: ITheme) => ({
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
  render(data: PageSizeSelectorData) {
    return (
      <PageSizeSelectorStyle>
        {
          (classes: any) =>
            <div className={classes.container}>
              <label className={classes.pageSizeText}>Items/Page</label>
              <DefaultButton
                text={String(data.pageSize)}
                className={classes.pageSizeSelector}

                menuProps={{
                  items: PAGE_SIZE_OPTIONS.map(option => ({
                    key: String(option),
                    name: String(option),

                    onClick:
                      data.onAction
                        ? (ev: any) => emitActionEvent(option, data.onAction)
                        : null
                  }))
                }}
              />
            </div>
        }
      </PageSizeSelectorStyle>
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
