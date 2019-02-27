// externals imports
import React, { ReactElement, Ref } from 'react'
import { defineComponent } from 'js-react-utils'
import { css, ActionButton, Callout, CommandBar, DefaultButton, ITheme, SearchBox, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react'
import { MdClose, MdFilterList, MdCheck, MdUndo, MdSearch } from 'react-icons/md'

// internal imports
import DataExplorerProps from './DataExplorerProps'
import DataExplorerStore from './DataExplorerStore'
import defineStyle, { ClassesOf } from '../../../styling/defineStyle'
import DataTable from '../data-table/DataTable'
import DataTableProps from '../data-table/DataTableProps'
import Paginator from '../../pagination/paginator/Paginator'
import PageSizeSelector from '../../pagination/page-size-selector/PageSizeSelector'
import PaginationInfo from '../../pagination/pagination-info/PaginationInfo'
import RowSelectionChangeEvent from '../../../events/RowSelectionChangeEvent'
import PageChangeEvent from '../../../events/PageChangeEvent'
import PageSizeChangeEvent from '../../../events/PageSizeChangeEvent'
import SortChangeEvent from '../../../events/SortChangeEvent'
import SearchIcon from '../../../system-icons/SearchIcon'
import { any } from 'prop-types';

// --- derived imports --------------------------------------------

const { useEffect, useRef,  useState, useCallback } = React

// --- DataExplorerStyle -------------------------------------------

const styleDataExplorer = defineStyle((theme: ITheme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.palette.white,
    height: '100%',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    padding: '2px 0 2px 10px',
    height: '42px',
    boxSizing: 'border-box',
    margin: '0 0 4px 0',
    zIndex: 1,
    color: theme.palette.black,
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralLight
  },

  headerStart: {
    marginRight: '30px',
  },

  headerCenter: {
    flexGrow: 1
  },

  headerEnd: {
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
    fontSize: theme.fonts.large.fontSize,
    margin: '0 6px 3px 6px',
    whiteSpace: 'nowrap',
  },

  actionBar: {
    display: 'inline-flex',

    selectors: {
      '& .ms-CommandBar': {
        backgroundColor: 'transparent !important'
      }
    }
  },
  
  actionButton: {
    color: theme.palette.black,
    backgroundColor: 'transparent',
    margin: '1px 0 0 4px',

    selectors: {
      ':hover': {
        backgroundColor: theme.palette.neutralLight,
      },
  
      ':active': {
        backgroundColor: theme.palette.neutralQuaternary
      },
    }
  },

  actionButtonDisabled: {
    color: theme.palette.neutralTertiary,
  },

  actionIcon: {
    color: theme.palette.themePrimary,
    fontSize: theme.fonts.mediumPlus.fontSize,
    //color: theme.palette.black,
    margin: '2px 5px 0 0',
  },
  
  actionIconDisabled: {
    color: theme.palette.neutralTertiary,
    fontSize: theme.fonts.mediumPlus.fontSize,
    margin: '2px 5px 0 0',
  },

  actionButtonSeparator: {
    height: '10px',
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
    borderColor: '#aaa',
    margin: '17px 3px 0 3px'
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
    backgroundColor: 'rgba(63, 63, 63, 0.08)',
    borderRadius: '2px',
  },

  loadingSpinner: {
    selectors: {
      '.ms-Spinner-circle': {
        borderColor: 
          theme.palette.neutralLight
            + ' ' + theme.palette.neutralLight
            + ' ' + theme.palette.neutralLight
            + ' transparent !important'
      }
    }
  },

  loadingPanelContent: {
    backgroundColor: theme.palette.neutralSecondary,
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 18px',

    selectors: {
      '& *': {
        color: 'white !important',
        fontSize: theme.fonts.medium.fontSize
      }
    }
  }
}))

type DataExplorerClasses = ClassesOf<typeof styleDataExplorer>

// --- DataExplorerView ---------------------------------------------

function DataExplorerView(props: DataExplorerProps, store: DataExplorerStore) {
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
            sortDesc={store.sortDesc}

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
        <SearchBar />
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
        action.kind === 'singleRow' && store.rowSelection.length !== 1
            || action.kind === 'multiRow' && store.rowSelection.length === 0

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

// --- SearchBar ----------------------------------------------------

const styleSearchBar = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  searchBox: {
    width: '220px',
    height: '30px',
    paddingRight: '2px',
  },

  advancedFilter: {
    margin: '0 16px',

    selectors: {
      '& *': {
        color: theme.palette.black,
        backgroundColor: 'transparent !important',
      },

      '&:hover': {
        backgroundColor: theme.palette.neutralLight
      },
      
      '&:active': {
        backgroundColor: theme.palette.neutralQuaternary
      }
     }
  },

  filterButton: {
    height: '30px',
    marginLeft: '8px',

    selectors: {
      ':hover': {
        color: theme.palette.white,
        backgroundColor: theme.palette.neutralLight,
      },
      
      ':active': {
        color: theme.palette.white + ' !important',
        backgroundColor: theme.palette.neutralQuaternary,
      }
    }
  },

  filterButtonActive: {
    color: theme.palette.white + ' !important',
    backgroundColor: theme.palette.neutralQuaternary,
  },

  icon: {
    color: theme.palette.themePrimary + ' !important' // TODO
  },

  filterContainer: {
    width: '400px',
    minHeight: '200px'
  }
}))

const SearchBar = defineComponent({
  displayName: 'SearchBar',

  render: function View() { 
    const
      [state, setState] = useState({
        calloutVisible: false,
        advancedFilterActive: false
      }),

      advancedFilterRef = useRef(null)

    return styleSearchBar(classes => {
      const filterButtonClassName =
        state.advancedFilterActive || state.calloutVisible
          ? css(classes.filterButton, classes.filterButtonActive) 
          : classes.filterButton

      return (
        <div className={classes.container}>
          {
            !state.advancedFilterActive && 
              <SearchBox
                placeholder="Search..."
                className={classes.searchBox}
                disableAnimation={true}
              />
          }
          <div className={classes.advancedFilter} ref={ advancedFilterRef }>
            <ActionButton
              text="Advanced Filter"
              className={filterButtonClassName}
              iconProps={{ iconName: 'icon' }}
            
              onClick={
                () => setState(
                  state => ({
                    advancedFilterActive: !state.advancedFilterActive,
                    calloutVisible: !state.advancedFilterActive
                  }))
              }

              onRenderIcon={
                () =>
                  <div className={classes.icon}>
                    {
                      state.advancedFilterActive || state.calloutVisible
                        ? <MdCheck className={classes.icon}/>
                        : <MdFilterList className={classes.icon}/>
                    }
                  </div>
              }
            />
          </div>
          {
              <Callout
                hidden={!state.calloutVisible}
                target={advancedFilterRef.current}
                setInitialFocus={true}
                onDismiss={ () => closeCallout()}
              >
                <div className={classes.filterContainer}>
                  [TODO: Add filters here...] 
                </div>
                <CommandBar
                  items={[
                    {
                      text: 'Apply filter',
                      key: '1',

                      iconProps: {
                        iconName: 'applyFilter'
                      },

                      onRenderIcon: () => <MdFilterList className={classes.icon}/>
                    },
                    {
                      text: 'Cancel',
                      key: '2',
                      
                      iconProps: {
                        iconName: 'cancel'
                      },

                      onRenderIcon: () => <MdClose className={classes.icon}/>,

                      onClick: () => closeCallout()
                    }
                  ]}

                  farItems={[
                    {
                      text: 'Reset',
                      key: '2',

                      iconProps: {
                        iconName: 'undo'
                      },

                      onRenderIcon: () => <MdUndo className={classes.icon}/>
                    }
                  ]}

                />
            </Callout>
          }
        </div>
      )
    })

    function closeCallout() {
      setState({
        advancedFilterActive: false,
        calloutVisible: false
      })
    }
  } as any // TODO
})

// --- exports ------------------------------------------------------

export default DataExplorerView
