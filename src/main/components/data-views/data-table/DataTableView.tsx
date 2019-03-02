// external imports
import React, { ReactElement } from 'react'
import { css, Checkbox, ITheme } from 'office-ui-fabric-react'
import { AutoSizer, Column, Table } from 'react-virtualized'

// internal imports
import defineStyle, { ClassesOf } from '../../../styling/defineStyle'
import DataTableProps from './DataTableProps'
import SortAscIcon from './internal/icons/SortAscIcon'
import SortDescIcon from './internal/icons/SortDescIcon'

// --- styles of DataTable ------------------------------------------

const styleDataTable = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexGrow: 1,
    overflow: 'hidden',

    selectors: {
      '& .ReactVirtualized__Table__Grid': {
        outline: 'none',
      },

      '& .ReactVirtualized__Table__rowColumn': {
        margin: 0
      }
    }
  },

  tableHead: {
    display: 'flex',
    alignItems: 'stretch !important',
    justifyContent: 'stretch',
    flexWrap: 'nowrap',

    selectors: {
      '& > *': {
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '5px',
        color: theme.palette.black,
        backgroundColor: theme.palette.neutralLighter,
        borderWidth: '1px 0 1px 1px',
        borderColor: theme.palette.neutralTertiaryAlt,
        borderStyle: 'solid',
        fontSize: theme.fonts.mediumPlus.fontSize,
        fontWeight: 'normal',
        textTransform: 'none',
      },

      '& > *:last-child': {
        borderRightWidth: '1px'
      },

      '& > *[data-sortable=true]': {
        cursor: 'pointer',
        
        selectors: {
          ':hover': {
            //borderBottomWidth: '1px',
            //borderBottomStyle: 'solid',
            //borderBottomColor: theme.palette.themePrimary,
            backgroundColor: theme.palette.neutralLight,
          },

          ':active': {
            backgroundColor: theme.palette.neutralTertiaryAlt,
          }
        }
      },
    }
  },

  tableHeadCellContent: {
    display: 'flex',
    whiteSpace: 'nowrap',
    position: 'relative',
  },

  selectAllRowsCheckBox: {
    padding: '5px 0 0 4px',
  },
  
  selectRowCheckBox: {
    position: 'absolute',
    top: 4,
    left: 6,
  },

  tableBody: {
    selectors: {
      '& > tr': {
        backgroundColor: theme.palette.white, 
      },

      '& > tr > td': {
        boxSizing: 'border-box',
        padding: '0.375rem',
        fontSize: theme.fonts.medium.fontSize,
        borderWidth: '0 0 0.5px 0',
        borderColor: theme.palette.neutralLight,
        borderStyle: 'solid',
      },
    }
  },

  tableRow: {
    borderWidth: '0 0 1px 0',
    borderColor: theme.palette.neutralLight,
    borderStyle: 'solid',
    fontSize: '14px',
  },

  cell: {
    position: 'relative',
    boxSizing: 'border-box',
    height: '2em',
  },

  dataCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    height: '2em',
    padding: '4px 8px'
  },

  alignCenter: {
    textAlign: 'center'
  },

  alignEnd: {
    textAlign: 'right'
  },

  rowSelectionColumn: {
    width: '32px',
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,

      selectors: {
      '& > div': {
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
      }
    }
  },

  selectedRow: {
    boxSizing: 'border-box',
    height: '2em',
    //backgroundColor: theme.palette.themeLighterAlt
    backgroundColor: 'rgb(255, 244, 202)'
  }
}))

type DataTableClasses = ClassesOf<typeof styleDataTable>

// --- DataTableView ------------------------------------------------

function DataTableView(props: DataTableProps, ref: any) { // TODO
  const
    [selectedRows, setSelectionRows] = React.useState(() => new Set<number>()),
    runOnUpdater = React.useRef([]),
    rowSelectionMode = props.rowSelectionOptions.mode || 'none'

  React.useImperativeHandle(ref, () => {
    return {
      unselectAllRows: () => {
        setSelectionRows(new Set()) 
      }
    }
  }, [])

  React.useEffect(() =>  {
    for (let i = 0; i < runOnUpdater.current.length; ++i) {
      const action = runOnUpdater.current[i]
      action()
    }
  
    runOnUpdater.current.length = 0
  })


  function changeSort(field: string, sortDesc: boolean) {
    const onSortChange = props.onSortChange

    if (onSortChange) {
      runOnUpdater.current.push(() => onSortChange({
        type: 'sortChange',
        sortBy: field,
        sortDesc
      }))

      setSelectionRows(selectedRows) // TODO
    }
  }

  function changeSelection(selection: Set<number>) { // TODO
    setSelectionRows(selection)

    const onRowSelectionChange = props.onRowSelectionChange

    if (onRowSelectionChange) {
      runOnUpdater.current.push(() => onRowSelectionChange({
        type: 'rowSelectionChange',
        selection: Array.from(selection)
      }))
    }
  }

  return styleDataTable(classes => {
    return (
      <div className={classes.container}>
        <AutoSizer>
          {
            ({ width, height }) => { 
              const
                columnWidths = calculateColumnWidths(props, width),
                   dataColumns = 
                  props.columns.map((column: any, columnIndex: any)  => // TODO
                    <Column
                      width={columnWidths.dataColumns[columnIndex]}
                      label={column.title}
                      dataKey={column.field}
                      className={classes.cell}
                      cellRenderer={({ rowIndex }) => {
                        const isSelected = selectedRows.has(rowIndex)

                        return createTableBodyCell(columnIndex, props, props.data[rowIndex], classes, isSelected)}
                      }
                    />
                  )
               if (props.rowSelectionOptions.mode !== 'none') {
                  dataColumns.unshift(
                    <Column
                      width={columnWidths.selectorColumn}
                      dataKey={null}
                      className={classes.cell}
                      cellRenderer={({ rowIndex }) => {
                        const isSelected = selectedRows.has(rowIndex)

                        return (
                          <div className={isSelected ? classes.selectedRow : null}>
                            {createSelectRowCheckbox(rowIndex, props, selectedRows, changeSelection, classes)}
                          </div>
                        )
                      }}
                    />
                  )
                }

                return (
                  <Table
                    width={width}
                    height={height - 10}
                    headerHeight={20}
                    rowHeight={28}
                    rowCount={props.data.length}
                    rowGetter={({ index }) => props.data[index]}
                    headerRowRenderer={(params: any) => createHeaderRow(props, selectedRows, columnWidths, classes, changeSelection, changeSort)}
                    rowClassName={classes.tableRow}
                  >
                    {dataColumns}
                  </Table>
                )
              }
            }
          </AutoSizer>
        </div>
    )
  })
}

// --- locals -------------------------------------------------------

function calculateColumnWidths(props: DataTableProps, totalWidth: number) {
  const
    hasSelectorColumn = props.rowSelectionOptions.mode !== 'none',
    selectorColumnWidth = hasSelectorColumn ? 32 : 0,
    columns = props.columns,
    columnCount = columns.length,

    ret = {
      selectorColumn: selectorColumnWidth,
      dataColumns: [] as number[]
    }

    const
      realTotal = totalWidth - selectorColumnWidth,

      ratioTotal = columns.reduce((sum, col) => {
        return sum + (col.width || 100)
      }, 0)

    let sumRealWidths = 0 

    for (let i = 0; i < columnCount; ++i) {
      const
        column = columns[i],
  
        realWidth =
          i < columnCount - 1
            ? Math.round((column.width || 100) * realTotal / ratioTotal)
            : realTotal - sumRealWidths - 0.5 // TODO: why -0.5

      sumRealWidths += realWidth

      ret.dataColumns.push(realWidth)
    }

    return ret
}

function createHeaderRow(props: DataTableProps, selectedRows: Set<number>, columnWidths: any,  classes: DataTableClasses, changeSelection: (selection: any) => void, changeSort: (field: string, sortDesc: boolean) => void) { // TODO
  const
    selectionMode = props.rowSelectionOptions.mode,

    selectionColumn =
      selectionMode === 'none'
        ? null
        : <div className={classes.rowSelectionColumn} style={{ minWidth: columnWidths.selectorColumn }}>
            <div>
              {
                selectionMode === 'multi'
                  ? createSelectAllCheckbox(props, selectedRows, changeSelection, classes)
                  : null
              }
            </div>
          </div>

  return (
    <div className={css('ReactVirtualized__Table__headerRow', classes.tableHead)}>
      {selectionColumn}
      {
        props.columns.map((column, columnIdx) =>
          createTableHeadCell(columnIdx, props, columnWidths.dataColumns[columnIdx], classes, changeSort))
      }
    </div>
  )
}

function createTableHeadCell(columnIdx: number, props: DataTableProps, width: number, classes: DataTableClasses, changeSort: (field: string, sortDesc: boolean) => void) {
  const
    column = props.columns[columnIdx],
    sortable = props.columns[columnIdx].sortable,
    sortBy = props.sortBy,
    sortDir = props.sortDir,
    isSorted = sortBy !== null && sortBy === column.field,

    sortIcon = // TODO
      <div style={{ width: '20px', height: '20px' }}>
        {
          sortable && isSorted
            ? (sortDir === 'asc' ? <SortAscIcon/> : <SortDescIcon/>)
            : null
        }
      </div>,

    onClick = 
      !sortable && column.field
        ? null
        : () => {
          changeSort(column.field, isSorted ? sortDir !== 'desc' : false)
        } 

  return (
    <div key={columnIdx} data-sortable={String(sortable)} onClick={onClick} style={{ width, minWidth: width, maxWidth: width }}>
      <div className={classes.tableHeadCellContent}>
        {column.title}
        {sortIcon}
      </div>
    </div>
  )
}

function createTableBodyCell(columnIndex: number, props: DataTableProps, row: any, classes: DataTableClasses, isSelected: boolean) {
  const column = props.columns[columnIndex]

  let className =
    column.align === 'center'
      ? css(classes.dataCell, classes.alignCenter)
      : column.align === 'end'
      ? css(classes.dataCell, classes.alignEnd)
      : classes.dataCell

  if (isSelected) {
    className = css(className, classes.selectedRow)
  }

  return (
    <div key={columnIndex} className={className}>
      {row[column.field]}
    </div>
  )
}

function createSelectRowCheckbox(index: number, props: DataTableProps, selectedRows: Set<number>, changeRowSelection: (selection: any) => void, classes: DataTableClasses) { // TODO
  const
    selectionMode = props.rowSelectionOptions.mode,
    checked = selectedRows.has(index),

    onChange =() => {
      let selectedRows: Set<number>
      
      if (selectionMode === 'single') {
        selectedRows = new Set([index])
      } else {
        selectedRows = new Set(selectedRows)

        if (checked) {
          selectedRows.delete(index)
        } else {
          selectedRows.add(index)
        }
      }

      changeRowSelection(selectedRows)
    }

  return (
    <div className={classes.selectRowCheckBox}>
      <Checkbox checked={checked} onChange={onChange}/>
    </div>
  ) 
}

function createSelectAllCheckbox(props: DataTableProps, selectedRows: Set<number>, changeRowSelection: (selection: Set<number>) => void, classes: DataTableClasses) { // TODO
  const
    rowSelectionSize = selectedRows.size,
    checked = rowSelectionSize > 0 && rowSelectionSize === props.data.length,

    onChange =() => {
      const selectedRows: Iterable<number> =
        checked
          ? []
          : props.data.keys()

      changeRowSelection(new Set(selectedRows))
    }

  return (
    <Checkbox checked={checked} onChange={onChange} className={classes.selectAllRowsCheckBox}/>
  ) 
}

// --- exports ------------------------------------------------------

export default DataTableView
