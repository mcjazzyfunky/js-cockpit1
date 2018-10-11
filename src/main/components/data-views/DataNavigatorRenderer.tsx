// internal imports
import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import { DataNavigatorModel } from './DataNavigator'
import DataTable, { DataTableProps, DataTableColumnProps } from './DataTable'
import Paginator from '../pagination/Paginator'
import PageSizeSelector from '../pagination/PageSizeSelector'
import PaginationInfo from '../pagination/PaginationInfo'
import RowSelectionChangeEvent from '../../events/RowSelectionChangeEvent'
import PageChangeEvent from '../../events/PageChangeEvent'
import PageSizeChangeEvent from '../../events/PageSizeChangeEvent'
import SortChangeEvent from '../../events/SortChangeEvent'

// extenal imports
import React, { ReactElement } from 'react'
import { CommandBar, DefaultButton, ITheme, Link, SearchBox, Spinner, SpinnerSize } from 'office-ui-fabric-react'
import Color from 'color'

// --- DataNavigatorStyle -------------------------------------------

const styleDataNavigator = defineStyle((theme: ITheme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    //border: '1px solid ' + theme.palette.neutralLight,
  },

  header: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    padding: '4px 8px',
    margin: '0 0 -1px 0',
    zIndex: 1000,
    color: theme.palette.black,
    backgroundColor: theme.palette.neutralQuaternaryAlt,//theme.palette.themeSecondary,
    borderWidth: '1px 1px 1px 1px',
    borderStyle: 'solid',
    borderRadius: '1px',
    borderColor: theme.palette.neutralQuaternary,
  },

  headerStart: {
  },

  headerCenter: {
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
    flexShrink: 1,
    padding: '0 0 1px 0',
    overflow: 'auto',
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 0,
    padding: '4px 5px 1px 5px',
    borderWidth: '0.5px 0 0 0',
    borderColor: theme.palette.neutralTertiaryAlt,
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
    fontSize: theme.fonts.mediumPlus.fontSize,
    margin: '3px 6px 3px 6px'
  },

  actionBar: {
    display: 'inline-flex',
    height: '34px',
    backgroundColor: 'transparent',
  },
  
  actionButton: {
    backgroundColor: 'transparent',
    margin: '0 0px',
  },

  actionButtonSeparator: {
    height: '10px',
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
    borderColor: '#aaa',
    margin: '13px 3px 0 3px'
  },

  loadingPanel: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: '10000',
    backgroundColor: 'rgba(63, 63, 63, 0.05)',
    borderRadius: '2px',
  },

  loadingSpinner: {
  },

  loadingPanelContent: {
    backgroundColor: theme.palette.neutralSecondaryAlt,
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 14px',

    selectors: {
      '& *': {
        color: 'white !important',
        fontSize: theme.fonts.medium.fontSize
      }
    }
  }
}))

type DataNavigatorClasses = ClassesOf<typeof styleDataNavigator>

// --- DataNavigatorRenderer ----------------------------------------

class DataNavigatorRenderer {
  private _model: DataNavigatorModel | null = null
  private _dataTable: any = null // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  constructor() {
    this._onPageChange = this._onPageChange.bind(this)
    this._onPageSizeChange = this._onPageSizeChange.bind(this)
    this._onSortChange = this._onSortChange.bind(this)
  }

  render(model: DataNavigatorModel) {
    this._model = model

    const
      tableColumns: ReactElement<DataTableProps>[] =
        model.columns.map((column, columnIdx) => {
          const props: DataTableColumnProps = {
            title: column.title,
            width: column.width
          }

          if (column.field !== null) {
            props.field = column.field
          }

          if (column.align !== null) {
            props.align = column.align
          }

          if (column.sortable) {
            props.sortable = true
          }

          return <DataTable.Column key={columnIdx} {...props} />
        })

    const ret = styleDataNavigator(classes => {
      const loadingPanel =
        model.isLoading
          ? <div className={classes.loadingPanel}>
              <div className={classes.loadingPanelContent}>
                <Spinner size={SpinnerSize.large} className={classes.loadingSpinner} label="Loading data, please wait..." ariaLive="assertive" /> 
              </div>
            </div>
          : null

      return (
        <div className={classes.container}>
          {loadingPanel}
          { this._renderHeader(model, classes) }
          <div className={classes.content}>
            <DataTable
              ref={(it: any) => { this._dataTable = it }}
              data={model.data}
              rowSelectionOptions={{
                mode: 'multi' // TODO
              }}

              sortBy={model.sortBy}
              sortDesc={model.sortDesc}

              onRowSelectionChange={
                (event: RowSelectionChangeEvent) => {
                  model.api.changeRowSelection(event.selection) 
                }
              }
              
              onSortChange={this._onSortChange}
              
            >
              {tableColumns}
            </DataTable>
          </div>
            {
              this._model.pageIndex >= 0 && this._model.pageSize > 0 && this._model.totalItemCount > 0 
                ? this._renderFooter(model, classes)
                : null
            }
        </div>
      )
    })

    return ret
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
            {/* this._renderActionBar(model, classes) */}
        </div>
        <div className={classes.headerEnd}>
        </div>
      </div>
    ) 
  }

  private _renderFooter(model: DataNavigatorModel, classes: DataNavigatorClasses) {
    if (model.pageIndex === null || model.totalItemCount === null) {
      return null
    }    
    
    return (
      <div className={classes.footer}> 
        <div className={classes.footerStart}>
          <Paginator
            pageIndex={model.pageIndex}
            pageSize={model.pageSize}
            totalItemCount={model.totalItemCount}
            onPageChange={this._onPageChange}
          />
        </div>
        <div className={classes.footerCenter}>
          <PageSizeSelector
            pageSize={model.pageSize}
            onPageSizeChange={this._onPageSizeChange}
          />
        </div>
        <div className={classes.footerEnd}>
          <PaginationInfo
            pageIndex={model.pageIndex}
            totalItemCount={model.totalItemCount}
            pageSize={model.pageSize}
            about="items"
          />
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

      if (idx > 100000) {
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

  private _onPageChange(event: PageChangeEvent) {
    this._model.api.changePage(
      event.pageIndex,
      () => this._dataTable.unselectAllRows())
  }

  private _onPageSizeChange(event: PageSizeChangeEvent) {
    this._model.api.changePageSize(
      event.pageSize,
      () => this._dataTable.unselectAllRows())
  }

  private _onSortChange(event: SortChangeEvent) {
    this._model.api.changeSort(
      event.sortBy,
      event.sortDesc,
      () => this._dataTable.unselectAllRows())
  }
}

// --- exports ------------------------------------------------------

export default DataNavigatorRenderer
