import React from 'react'
import defineRenderer from '../defineRenderer'
import defineStyle from '../../api/styling/defineStyle'
import { Model_DataNavigator } from '../../api/components/data-views/DataNavigator'
import PaginationBar from './components/PaginationBar'
import { ITheme } from 'office-ui-fabric-react'
import ActionBar from './components/ActionBar'

// --- DataNavigatorStyle -------------------------------------------

const DataNavigatorStyle = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },

  header: {
    padding: '0.25rem 0.5rem',
    borderWidth: '0 0 1px 0',
    borderColor: '#ddd',
    borderStyle: 'solid',
  },

  content: {
    flexGrow: 1
  },

  footer: {
    padding: '0.25rem 0.5rem',
    borderWidth: '1px 0 0 0',
    borderColor: '#ddd',
    borderStyle: 'solid',
  },

  title: {
    display: 'inline-block',
    color: theme.palette.themePrimary,
    ...theme.fonts.large,
    marginRight: '2rem'
  },

  actionBar: {
    display: 'inline-flex'
  }
}))
// --- DataNavigatorStyle -------------------------------------------

const DataNavigatorRenderer = defineRenderer<Model_DataNavigator>(
  (model: Model_DataNavigator) => {
    return (
      <DataNavigatorStyle>
        {
          (classes: any) =>
            <div className={classes.container}>
              <div className={classes.header}>
                { renderHeader(model, classes) }
              </div>
              <div className={classes.content}>
              </div>
              <div className={classes.footer}>
                { renderFooter(model) }
              </div>
            </div>
        }
      </DataNavigatorStyle>
    )
  })

// --- header -------------------------------------------------------

function renderHeader(model: Model_DataNavigator, classes: any) {
  return (
    <div>
      <div className={classes.title}>
        Product
      </div>
      <div className={classes.actionBar}>
        <ActionBar/>
      </div>
    </div>
  ) 
}

// --- footer -------------------------------------------------------

function renderFooter(model: Model_DataNavigator) {
  return <PaginationBar/>
}

// --- exports ------------------------------------------------------

export default DataNavigatorRenderer
