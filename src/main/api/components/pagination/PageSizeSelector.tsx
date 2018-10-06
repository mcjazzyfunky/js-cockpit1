// internal imports
import defineStyle from '../../styling/defineStyle'

// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'
import { DefaultButton, ITheme } from 'office-ui-fabric-react'

// constants

const PAGE_SIZE_OPTIONS = [25, 50, 100, 250, 500]

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

// --- PageSizeSelector ---------------------------------------------

type PageSizeSelectorProps = {
  pageSize: number
}

const PageSizeSelector = defineComponent<PageSizeSelectorProps>({
  displayName: 'PageSizeSelector',

  properties: {
    pageSize: {
      type: Number,
      required: true,
      validate: Spec.in(PAGE_SIZE_OPTIONS)
    },
  },

  render(props: PageSizeSelectorProps) {
    return (
      <PageSizeSelectorStyle>
        {
          (classes: any) =>
            <div className={classes.container}>
              <label className={classes.pageSizeText}>Items/Page</label>
              <DefaultButton
                text={String(props.pageSize)}
                className={classes.pageSizeSelector}

                menuProps={{
                  items: PAGE_SIZE_OPTIONS.map(option => ({
                    key: String(option),
                    name: String(option)
                  }))
                }}
              />
            </div>
        }
      </PageSizeSelectorStyle>
    )
  }
})

// --- exports ------------------------------------------------------

export default PageSizeSelector