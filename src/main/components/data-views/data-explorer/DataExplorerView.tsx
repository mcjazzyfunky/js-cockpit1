// internal imports
import defineStyle, { ClassesOf } from '../../../styling/defineStyle'
import { DataExplorerModel } from './DataExplorer'
import DataTable from '../data-table/DataTable'
import DataTableProps from '../data-table/DataTableProps'
import DataTableColumnProps from '../data-table/DataTableColumnProps'
import Paginator from '../../pagination/paginator/Paginator'
import PageSizeSelector from '../../pagination/page-size-selector/PageSizeSelector'
import PaginationInfo from '../../pagination/pagination-info/PaginationInfo'
import RowSelectionChangeEvent from '../../../events/RowSelectionChangeEvent'
import PageChangeEvent from '../../../events/PageChangeEvent'
import PageSizeChangeEvent from '../../../events/PageSizeChangeEvent'
import SortChangeEvent from '../../../events/SortChangeEvent'
import SearchIcon from '../../../system-icons/SearchIcon'


// extenal imports
import React, { ReactElement, Ref } from 'react'
import { defineComponent } from 'js-react-utils'
import { css, ActionButton, Callout, CommandBar, DefaultButton, ITheme, SearchBox, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react'
import { MdClose, MdFilterList, MdCheck, MdUndo, MdSearch } from 'react-icons/md'

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

// --- DataExplorerRenderer ----------------------------------------

class DataExplorerRenderer {
  private _model: DataExplorerModel | null = null
  private _dataTable: any = null // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  constructor() {
    this._onPageChange = this._onPageChange.bind(this)
    this._onPageSizeChange = this._onPageSizeChange.bind(this)
    this._onSortChange = this._onSortChange.bind(this)
  }

  render(model: DataExplorerModel) {
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

    const ret = styleDataExplorer(classes => {
      const loadingPanel =
        model.isLoading
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
              
              columns={tableColumns}
            />
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

  private _renderHeader(model: DataExplorerModel, classes: DataExplorerClasses) {
    return (
      <div className={classes.header}>
        <div className={classes.headerStart}>
          <div className={classes.title}>
            {model.title} 
          </div>
        </div>
        <div className={classes.headerCenter}>
            { this._renderActionBar(model, classes) }
        </div>
        <div className={classes.headerEnd}>
          <SearchBar />
        </div>
      </div>
    ) 
  }

  private _renderFooter(model: DataExplorerModel, classes: DataExplorerClasses) {
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

  private _renderActionBar(model: DataExplorerModel, classes: DataExplorerClasses) {
    const items: any[] = []
  
    model.actions.forEach((action, idx) => {
      const
        disabled =
          action.$kind === 'DataExplorerSingleRowActionModel' && model.rowSelection.length !== 1
              || action.$kind === 'DataExplorerMultiRowActionModel' && model.rowSelection.length === 0

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

type SearchBarProps = {
}

type SearchBarState = {
  advancedFilterActive: boolean,
  calloutVisible: boolean
}

const SearchBar = defineComponent<SearchBarProps>({
  displayName: 'SearchBar',

  render: class extends React.Component<SearchBarProps, SearchBarState> {
    private _advancedFilterRef: any = null // TODO

    constructor(props: SearchBarProps) {
      super(props)

      this.state = {
        advancedFilterActive: false,
        calloutVisible: false 
      }
    }

    render() {
      const
        advancedFilterActive = this.state.advancedFilterActive,
        calloutVisible = this.state.calloutVisible
        
      return styleSearchBar(classes => {
        const filterButtonClassName =
          advancedFilterActive || calloutVisible
            ? css(classes.filterButton, classes.filterButtonActive) 
            : classes.filterButton
  
        return (
          <div className={classes.container}>
            {
              !advancedFilterActive && 
                <SearchBox
                  placeholder="Search..."
                  className={classes.searchBox}
                  disableAnimation={true}
                />
            }
            <div className={classes.advancedFilter} ref={ it => this._advancedFilterRef = it }>
              <ActionButton
                text="Advanced Filter"
                className={filterButtonClassName}
                iconProps={{ iconName: 'icon' }}
              
                onClick={
                  () => this.setState(
                    state => ({
                      advancedFilterActive: !state.advancedFilterActive,
                      calloutVisible: !state.advancedFilterActive
                    }))
                }

                onRenderIcon={
                  () =>
                    <div className={classes.icon}>
                      {
                        advancedFilterActive || calloutVisible
                          ? <MdCheck className={classes.icon}/>
                          : <MdFilterList className={classes.icon}/>
                      }
                    </div>
                }
              />
            </div>
            {
                <Callout
                  hidden={!calloutVisible}
                  target={this._advancedFilterRef}
                  setInitialFocus={true}
                  onDismiss={ () => this._closeCallout()}
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

                        onClick: () => this._closeCallout()
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
    }

    private _closeCallout() {
      this.setState(state => ({
        advancedFilterActive: false,
        calloutVisible: false
      }))
    }
  } as any // TODO
})

// --- exports ------------------------------------------------------

export default DataExplorerRenderer
