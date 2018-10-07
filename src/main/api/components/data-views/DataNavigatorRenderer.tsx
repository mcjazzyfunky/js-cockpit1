import React from 'react'
import defineStyle from '../../styling/defineStyle'
import { Model_DataNavigator } from './DataNavigator'
import { ITheme, SearchBox } from 'office-ui-fabric-react'
import ActionBar from './data-navigator/ActionBar'
import Paginator from '../pagination/Paginator'
import PageSizeSelector from '../pagination/PageSizeSelector'
import PaginationInfo from '../pagination/PaginationInfo'

// TODO
import DataTable from './DataTable'

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
    //padding: '0.25rem 0.75rem 2px 0',
    height: '40px',
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
    marginRight: '0.25rem',
  },

  content: {
    display: 'flex',
    flexGrow: 1,
    padding: '3px 0rem',
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0.25rem 0.5rem',
    borderWidth: '1px 0 0 0',
    borderColor: '#e8e8e8',
    borderStyle: 'solid',
  },

  footerStart: {
  },

  footerCenter: {
    flexGrow: 1,
    padding: '0 3rem',
  },

  title: {
    display: 'inline-block',
    //color: theme.palette.themePrimary,
    ...theme.fonts.large,
    fontWeight: 300,
    marginRight: '0.5rem',
  },

  actionBar: {
    display: 'inline-flex',
  }
}))
// --- DataNavigatorStyle -------------------------------------------

const DataNavigatorRenderer = { 
  render(model: Model_DataNavigator) {
    return (
      <DataNavigatorStyle>
        {
          (classes: any) =>
            <div className={classes.container}>
              { renderHeader(model, classes) }
              <div className={classes.content}>
                <DataTable>
                  <DataTable.Column
                    title="First name"
                    field="firstName"
                  />
                  <DataTable.Column
                    title="Last Name"
                    field="lastName"
                  />
                  <DataTable.Column
                    title="Postal code"
                    field="postalCode"
                  />
                  <DataTable.Column
                    title="City"
                    field="city"
                  />
                </DataTable>
              </div>
              { renderFooter(model, classes) }
            </div>
        }
      </DataNavigatorStyle>
    )
  }
}

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
      <div className={classes.footerStart}>
        <Paginator pageIndex={2} totalItemCount={1243} pageSize={50} onAction={ev => console.log(ev)}/>
      </div>
      <div className={classes.footerCenter}>
        <PageSizeSelector pageSize={50} onAction={ev => console.log(ev) }/>
      </div>
      <div className={classes.footerEnd}>
        <PaginationInfo pageIndex={2} totalItemCount={1243} pageSize={50} about="items"/>
      </div>
    </div>
  )
}

// --- exports ------------------------------------------------------

export default DataNavigatorRenderer
