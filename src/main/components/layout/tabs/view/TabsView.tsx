// externals imports
import React, { ReactElement } from 'react'
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot'

// internal imports
import getTabsClasses from './getTabsClasses'
import TabsProps from '../types/TabsProps'
import TabsPageProps from '../types/TabsPageProps'

// derived import
const { Children } = React

// --- TabsView -----------------------------------------------------

function TabsView(props: TabsProps) {
  const classes = getTabsClasses()

  return (
    <div className={classes.container}>
      <Pivot>
        {
          Children.map((props.children as any), (page: ReactElement<TabsPageProps>) => {
            return (
              <PivotItem headerText={page.props.title}>
                <div className={classes.page}>
                  {page.props.children}
                </div>
              </PivotItem>
            )
          })
        }
      </Pivot>
    </div>
  )
}

// --- exports -----------------------------------------------------

export default TabsView
