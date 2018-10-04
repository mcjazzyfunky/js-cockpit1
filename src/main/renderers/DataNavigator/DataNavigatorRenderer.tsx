import React from 'react'
import defineRenderer from '../defineRenderer'
import defineStyle from '../../api/styling/defineStyle'
import { Model_DataNavigator } from '../../api/components/data-views/DataNavigator'
import PaginationBar from './components/PaginationBar'
import { ITheme, SearchBox, classNamesFunction } from 'office-ui-fabric-react'
import ActionBar from './components/ActionBar'

// TODO
import DataTable from '../../api/components/data-views/DataTable'

// --- DataNavigatorStyle -------------------------------------------

const DataNavigatorStyle = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0.75rem 0 0',
    borderWidth: '0 0 0.5px 0',
    borderColor: '#eaeaea',
    borderStyle: 'solid',
  },

  headerStart: {
    padding: '0 0 0 0.75rem'
  },

  headerCenter: {
    flexGrow: 1,
  },

  headerEnd: {
  },

  searchBox: {
    width: '15rem',
  },

  content: {
    flexGrow: 1
  },

  footer: {
    padding: '0.25rem 0.5rem',
    borderWidth: '1px 0 0 0',
    borderColor: '#e8e8e8',
    borderStyle: 'solid',
  },

  title: {
    display: 'inline-block',
    color: theme.palette.themePrimary,
    ...theme.fonts.xLarge,
    marginRight: '0.5rem',
  },

  actionBar: {
    display: 'inline-flex',
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
              { renderHeader(model, classes) }
              <div className={classes.content}>
              </div>
              { renderFooter(model, classes) }
            </div>
        }
      </DataNavigatorStyle>
    )
  })

// --- header -------------------------------------------------------

function renderHeader(model: Model_DataNavigator, classes: any) {
  return (
    <div className={classes.header}>
      <div className={classes.headerStart}>
        <div className={classes.title}>
          Product
        </div>
      </div>
      <div className={classes.headerCenter}>
        <div className={classes.actionBar}>
          <ActionBar/>
        </div>
      </div>
      <div className={classes.headerEnd}>
        <SearchBox placeholder="Search" className={classes.searchBox} />
      </div>
    </div>
  ) 
}

// --- footer -------------------------------------------------------

function renderFooter(model: Model_DataNavigator, classes: any) {
  return (
    <div className={classes.footer}> 
      <PaginationBar/>
    </div>
  )
}

// --- exports ------------------------------------------------------

export default DataNavigatorRenderer
