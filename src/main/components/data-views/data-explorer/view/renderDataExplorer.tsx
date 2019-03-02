// externals imports
import React from 'react'
import { css, CommandBar, Spinner, SpinnerSize } from 'office-ui-fabric-react'

// internal imports
import styleDataExplorer from './styleDataExplorer'
import DataExplorerProps from '../types/DataExplorerProps'
import DataExplorerStore from '../types/DataExplorerStore'
import DataTable from '../../data-table/DataTable'
import Paginator from '../../../pagination/paginator/Paginator'
import PageSizeSelector from '../../../pagination/page-size-selector/PageSizeSelector'
import PaginationInfo from '../../../pagination/pagination-info/PaginationInfo'
import RowSelectionChangeEvent from '../../../../events/RowSelectionChangeEvent'
import DataExplorerSearchBar from './DataExplorerSearchBar'
import { ClassesOf } from '../../../../styling/defineStyle'

// --- derived imports --------------------------------------------

const { useEffect, useRef,  useState, useCallback } = React

type DataExplorerClasses = ClassesOf<typeof styleDataExplorer>

// --- renderDataExplorer -------------------------------------------

function renderDataExplorer(props: DataExplorerProps, store: DataExplorerStore) {
  const
    dataTableRef = useRef(null),

    onSortChange = useCallback((event: any) => { // TODO
      store.loadSorting(
        event.sortBy,
        event.sortDesc,
        props.loadData,
        () => this._dataTable.unselectAllRows())
    }, null),

    onPageChange = useCallback((event: any) => { // TODO
      store.loadPage(
         event.pageIndex,
         props.loadData,
         () => this._dataTable.unselectAllRows())
    }, null),

    onPageSizeChange = useCallback((event: any) => { // TODO
      store.loadPageSize(
        event.pageSize,
        props.loadData,
        () => dataTableRef.current.unselectAllRows())
    }, null),

    tableColumns =
      props.columns.map((column, columnIdx) => {
        const props = {
          title: column.title,
          width: column.width,
          field: null as string, // TODO
          align: 'start' as ('start' | 'center' | 'end'), // TODO
          sortable: false
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

        return props 
      })


  useEffect(() => {
    store.loadPage(store.pageIndex, props.loadData, () => {
      // TODO
    })
  }, [])

  const ret = styleDataExplorer(classes => {
    const loadingPanel =
      store.isLoading
        ? <div className={classes.loadingPanel}>
            <div className={classes.loadingPanelContent}>
              <Spinner
                size={SpinnerSize.large}
                className={classes.loadingSpinner}
                label="Loading data, please wait..."
                ariaLive="assertive"
              /> 
            </div>
          </div>
        : null

    return (
      <div className={classes.container}>
        {loadingPanel}
        { renderHeader(props, store, classes) }
        <div className={classes.content}>
          <DataTable
            ref={dataTableRef}
            data={store.data}
            rowSelectionOptions={{
              mode: 'multi' // TODO
            }}

            sortBy={store.sortBy}
            sortDir={store.sortDir}

            onRowSelectionChange={
              (event: RowSelectionChangeEvent) => {
                store.setRowSelection(event.selection) 
              }
            }
            
            onSortChange={onSortChange}
            
            columns={tableColumns}
          />
        </div>
          {
             store.pageIndex >= 0 && store.pageSize > 0 && store.totalItemCount > 0 
              ? renderFooter(props, store, classes, onPageChange, onPageSizeChange)
              : null
          }
      </div>
    )
  })

  return ret
}

// --- helpers ------------------------------------------------------

function renderHeader(
  props: DataExplorerProps,
  store: DataExplorerStore,
  classes: DataExplorerClasses
) {
  return (
    <div className={classes.header}>
      <div className={classes.headerStart}>
        <div className={classes.title}>
          {props.title} 
        </div>
      </div>
      <div className={classes.headerCenter}>
          { renderActionBar(props, store, classes) }
      </div>
      <div className={classes.headerEnd}>
        <DataExplorerSearchBar search={props.search} store={store} />
      </div>
    </div>
  ) 
}

function renderFooter(
  props: DataExplorerProps,
  store: DataExplorerStore,
  classes: DataExplorerClasses,
  onPageChange: any, // TODO
  onPageSizeChange: any // TODO
) {
  if (store.pageIndex === null || store.totalItemCount === null) {
    return null
  }    
  
  return (
    <div className={classes.footer}> 
      <div className={classes.footerStart}>
        <Paginator
          pageIndex={store.pageIndex}
          pageSize={store.pageSize}
          totalItemCount={store.totalItemCount}
          onPageChange={onPageChange}
        />
      </div>
      <div className={classes.footerCenter}>
        <PageSizeSelector
          pageSize={store.pageSize}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
      <div className={classes.footerEnd}>
        <PaginationInfo
          pageIndex={store.pageIndex}
          totalItemCount={store.totalItemCount}
          pageSize={store.pageSize}
          about="items"
        />
      </div>
    </div>
  )
}

function renderActionBar(
  props: DataExplorerProps,
  store: DataExplorerStore,
  classes: DataExplorerClasses
) {
  const items: any[] = []

  props.actions.forEach((action, idx) => {
    const
      disabled =
        action.type === 'singleRow' && store.rowSelection.length !== 1
            || action.type === 'multiRow' && store.rowSelection.length === 0

    if (idx > 0) {
      items.push({
        key: `separator-${idx}`,
        onRender: () => <div className={classes.actionButtonSeparator}></div>
      })
    }

    const
      hasIcon = !!action.icon,
      iconProps = hasIcon ? { iconName: 'icon' } : null,

      actionButtonClassName =
        disabled
          ? css(classes.actionButton, classes.actionButtonDisabled)
          : classes.actionButton,
      
      iconClassName =
        hasIcon
          ? (disabled ? classes.actionIconDisabled : classes.actionIcon)
          : null

    items.push({
      key: String(idx),
      text: action.title,
      iconProps,
      disabled,
      className: actionButtonClassName,
      onRenderIcon: action.icon ?
        () => <div className={iconClassName}>{action.icon}</div>
        : undefined
    })

    if (idx > 0) {
      // items.push(<div>x</div>) // TODO xxx
    }
  })

  return (
    <CommandBar
      className={classes.actionBar}
      items={[]}
      farItems={items}
    />
  )
}

// --- exports ------------------------------------------------------

export default renderDataExplorer
