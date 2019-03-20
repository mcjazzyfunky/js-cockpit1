// externals imports
import React, { ReactNode } from 'react'
import { css, CommandBar, Spinner, SpinnerSize, Label } from 'office-ui-fabric-react'

// internal imports
import styleDataExplorer from './styleDataExplorer'
import DataExplorerProps from '../types/DataExplorerProps'
import DataExplorerStore from '../types/DataExplorerStore'
import DataTable from '../../data-table/DataTable'
import Paginator from '../../../pagination/paginator/Paginator'
import PageSizeSelector from '../../../pagination/page-size-selector/PageSizeSelector'
import PaginationInfo from '../../../pagination/pagination-info/PaginationInfo'
import RowSelectionChangeEvent from '../../../../events/RowSelectionChangeEvent'
import DataExplorerSearchBar from './types/DataExplorerSearchBar'
import DataExplorerFilterSection from '../types/DataExplorerFilterSection'
import CssClassesOf from '../../../../styling/types/CssClassesOf'
import DataTableMethods from '../../data-table/types/DataTableMethods'
import StringUtils from '../../../../utils/StringUtils'


// --- derived imports --------------------------------------------

const { Children, useEffect, useRef,  useState, useCallback } = React

type DataExplorerClasses = CssClassesOf<typeof styleDataExplorer>

// --- renderDataExplorer -------------------------------------------

function renderDataExplorer(props: DataExplorerProps, store: DataExplorerStore) {
  const
    dataTableRef = useRef(null as unknown as DataTableMethods),

    onSortChange = useCallback((event: any) => { // TODO
      store.loadSorting(
        event.sortBy,
        event.sortDesc,
        props.loadData,
        () => dataTableRef.current.unselectAllRows())
    }, []),

    onPageChange = useCallback((event: any) => { // TODO
      store.loadPage(
         event.pageIndex,
         props.loadData,
         () => dataTableRef.current.unselectAllRows())
    }, []),

    onPageSizeChange = useCallback((event: any) => { // TODO
      store.loadPageSize(
        event.pageSize,
        props.loadData,
        () => dataTableRef.current.unselectAllRows())
    }, []),

    tableColumns =
      props.columns.map(column => {
        const tableColumn = {
          title: column.title,
          width: column.width,
          field: null as string | null,
          align: 'start' as ('start' | 'center' | 'end'), // TODO
          sortable: false
        }

        if (column.field) {
          tableColumn.field = column.field
        }

        if (column.align) {
          tableColumn.align = column.align
        }

        if (column.sortable) {
          tableColumn.sortable = true
        }

        return tableColumn 
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
        {
          props.search
            && props.search.type === 'sections'
            && props.search.sections.length > 0
              ? renderFilterSections(props.search.sections as DataExplorerFilterSection[], store, classes)
              : null
        }
        <div className={classes.content}>
          <DataTable
            ref={dataTableRef}
            data={store.data}
            rowSelectionOptions={{
              mode: 'multi' // TODO
            }}

            sortBy={store.sortBy || undefined}
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
             store.pageIndex >= 0 && store.pageSize > 0 && (store.totalItemCount as number) > 0 
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
      {
        props.search && props.search.type === 'default'
          ? <div className={classes.headerEnd}>
              <DataExplorerSearchBar dataExplorerProps={props} dataExplorerStore={store} />
            </div>
          : null
      }
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

    /*
    if (idx > 0) {
      items.push({
        key: `separator-${idx}`,
        onRender: () => <div className={classes.actionButtonSeparator}></div>
      })
    }
    */

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
          : undefined

    items.push({
      key: String(idx),
      text: action.text,
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

function renderFilterSections(
  sections: DataExplorerFilterSection[],
  store: DataExplorerStore,
  classes: DataExplorerClasses
) {
  const output: any = sections.map((section) => {
    const contents = section.contents.map(content => {
      const
        label =
          StringUtils.isBlank(content.title)
            ? null
            : <Label>{content.title}</Label>,
      
        filters = content.filters.map(filter => {
          const
            label =
              StringUtils.isBlank(filter.label)
                ? null
                : <Label>{filter.label}</Label>,
            
            input =  "input"

          return (
            <div>
              {label}
              {input}
            </div>
          )
        })

        return <div>{label}{filters}</div>
      })
    
    return <div>{contents}</div>
  })

  return (
    <div className={classes.filterSections}>
      {...output}
    </div>
  )
}


// --- exports ------------------------------------------------------

export default renderDataExplorer
