// internal imports
import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import { DataNavigatorModel } from './DataNavigator'
import DataTable, { DataTableProps, DataTableColumnProps } from './DataTable'
import Paginator from '../pagination/Paginator'
import PageSizeSelector from '../pagination/PageSizeSelector'
import PaginationInfo from '../pagination/PaginationInfo'
import RowSelectionChangeEvent from '../../events/RowSelectionChangeEvent'
import SortChangeEvent from '../../events/SortChangeEvent'

// extenal imports
import React, { ReactElement } from 'react'
import { CommandBar, ITheme, SearchBox } from 'office-ui-fabric-react'

// --- DataNavigatorStyle -------------------------------------------

const styleDataNavigator = defineStyle((theme: ITheme) => ({
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

  footerEnd: {

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
    backgroundColor: 'transparent',
  },
  
  actionButton: {
    backgroundColor: 'transparent',
    margin: '0 2px',
  },

  actionButtonSeparator: {
    height: '10px',
    marginTop: '16px',
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
    borderColor: '#aaa',
  }
}))

type DataNavigatorClasses = ClassesOf<typeof styleDataNavigator>

// --- DataNavigatorStyle -------------------------------------------

class DataNavigatorRenderer {
  render(model: DataNavigatorModel) {
    console.log(model)

    const tableColumns: ReactElement<DataTableProps>[] =
      model.columns.map((column, columnIdx) => {
        const props: DataTableColumnProps = {
          title: column.title
        }

        if (column.field !== null) {
          props.field = column.field
        }

        if (column.sortable) {
          props.sortable = true
        }

        return <DataTable.Column key={columnIdx} {...props} />
      })
    
    return styleDataNavigator(classes =>
      <div className={classes.container}>
        { this._renderHeader(model, classes) }
        <div className={classes.content}>
          <DataTable
            rowSelectionOptions={{
              mode: 'multi'
            }}

            sortBy="firstName"
            sortDesc={false}

            onRowSelectionChange={
              (event: RowSelectionChangeEvent) => {
                model.api.changeRowSelection(event.selection) 
              }
            }
            
            onSortChange={
              (event: SortChangeEvent) => {
                console.log(event)
              }
            }
            
            data={[
              {
                firstName: 'Jane',
                lastName: 'Doe',
                postalCode: '1234',
                city: 'New York',
                country: 'USA'
              },
              {
                firstName: 'Mary',
                lastName: 'Miller',
                postalCode: '88891',
                city: 'London',
                country: 'United Kingdom'
              },
              {
                firstName: 'Jane',
                lastName: 'Doe',
                postalCode: '1234',
                city: 'New York',
                country: 'USA'
              },
              {
                firstName: 'Mary',
                lastName: 'Miller',
                postalCode: '88891',
                city: 'London',
                country: 'United Kingdom'
              },
              {
                firstName: 'Jane',
                lastName: 'Doe',
                postalCode: '1234',
                city: 'New York',
                country: 'USA'
              },
              {
                firstName: 'Mary',
                lastName: 'Miller',
                postalCode: '88891',
                city: 'London',
                country: 'United Kingdom'
              }
            ]}
          >
            {tableColumns}
          </DataTable>
        </div>
        { this._renderFooter(model, classes) }
      </div>
    )
  }

  private _renderHeader(model: DataNavigatorModel, classes: DataNavigatorClasses) {
    return (
      <div className={classes.header}>
        <div className={classes.headerStart}>
          <div className={classes.title}>
            {model.title} 
          </div>
        </div>
        <div className={classes.headerCenter}>
          <div className={classes.actionBar}>
            {this._renderActionBar(model, classes)}
          </div>
        </div>
        <div className={classes.headerEnd}>
          <SearchBox placeholder="Search" className={classes.searchBox} />
        </div>
      </div>
    ) 
  }

  private _renderFooter(model: DataNavigatorModel, classes: DataNavigatorClasses) {
    return (
      <div className={classes.footer}> 
        <div className={classes.footerStart}>
          <Paginator pageIndex={2} totalItemCount={1243} pageSize={50} onPageChange={ev => console.log(ev)}/>
        </div>
        <div className={classes.footerCenter}>
          <PageSizeSelector pageSize={50} onPageSizeChange={ev => console.log(ev) }/>
        </div>
        <div className={classes.footerEnd}>
          <PaginationInfo pageIndex={2} totalItemCount={1243} pageSize={50} about="items"/>
        </div>
      </div>
    )
  }

  private _renderActionBar(model: DataNavigatorModel, classes: DataNavigatorClasses) {
    const items: any[] = []
  
    model.actions.forEach((action, idx) => {
      const
        disabled =
          action.$kind === 'DataNavigatorSingleRowActionModel' && model.rowSelection.length !== 1
              || action.$kind === 'DataNavigatorMultiRowActionModel' && model.rowSelection.length === 0

      if (idx > 0) {
        items.push({
          key: `separator-${idx}`,
          onRender: () => <div className={classes.actionButtonSeparator}></div>
        })
      }

      items.push({
        key: String(idx),
        text: action.title,
        disabled,
        className: classes.actionButton 
      })
    })

    return (
      <CommandBar
        className={classes.actionBar}

        items={items}
      />
    )
  }
}

// --- exports ------------------------------------------------------

export default DataNavigatorRenderer
