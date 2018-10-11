// internal imports
import defineStyle, { ClassesOf } from '../../styling/defineStyle'
import { DataTableModel, DataTableColumnModel } from './DataTable'
import SortAscIcon from '../../icons/SortAscIcon'
import SortDescIcon from '../../icons/SortDescIcon'

// external imports
import React from 'react'
import { css, Checkbox, ITheme } from 'office-ui-fabric-react'
import { AutoSizer, Column, Table } from 'react-virtualized'

// --- DataTableStyle -----------------------------------------------

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
            backgroundColor: theme.palette.neutralQuaternaryAlt,
          },

          ':active': {
            backgroundColor: theme.palette.neutralQuaternary,
          }
        }
      },
    }
  },

  tableHeadCellContent: {
    display: 'flex',
    whiteSpace: 'nowrap',
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

  dataCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
    margin: 0,
    padding: 0,

      selectors: {
      '& > div': {
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }
    }
  },

  selectedRow: {
    color: 'black !important',
    backgroundColor: theme.palette.themeLighter + ' !important',
  }
}))

type DataTableClasses = ClassesOf<typeof styleDataTable>

// --- DataTableRenderer --------------------------------------------

class DataTableRenderer {
  private selectedRows: []

  render(model: DataTableModel)  {
    const rowSelectionMode = model.rowSelectionOptions.mode

    return styleDataTable(classes => {
       return (
        <div className={classes.container}>
          <AutoSizer>
            {
              ({ width, height }) => { 
                const
                  columnWidths = calculateColumnWidths(model, width),
  
                  dataColumns = 
                    model.columns.map((column, columnIndex)  =>
                      <Column
                        width={columnWidths.dataColumns[columnIndex]}
                        label={column.title}
                        dataKey={column.field}
                        cellRenderer={({ rowIndex }) =>
                          createTableBodyCell(columnIndex, model, model.data[rowIndex], classes)}
                      />
                    )

                if (model.rowSelectionOptions.mode !== 'none') {
                  dataColumns.unshift(
                    <Column
                      width={columnWidths.selectorColumn}
                      dataKey={null}
                      cellRenderer={({ rowIndex }) =>
                        createSelectCheckbox(rowIndex, model)}
                    />
                  )
                }


                return (
                  <Table
                    width={width}
                    height={height - 10}
                    headerHeight={20}
                    rowHeight={28}
                    rowCount={model.data.length}
                    rowGetter={({ index }) => model.data[index]}
                    headerRowRenderer={(params: any) => createHeaderRow(model, columnWidths, classes)}
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
}

// --- locals -------------------------------------------------------

function calculateColumnWidths(model: DataTableModel, totalWidth: number) {
  const
    hasSelectorColumn = model.rowSelectionOptions.mode !== 'none',
    selectorColumnWidth = hasSelectorColumn ? 32 : 0,
    columns = model.columns,
    columnCount = columns.length,

    ret = {
      selectorColumn: selectorColumnWidth,
      dataColumns: [] as number[]
    }

    const
      realTotal = totalWidth - selectorColumnWidth,

      ratioTotal = columns.reduce((sum, col) => {
        return sum + col.width
      }, 0)

    let sumRealWidths = 0 

    for (let i = 0; i < columnCount; ++i) {
      const
        column = columns[i],
  
        realWidth =
          i < columnCount - 1
            ? Math.round(column.width * realTotal / ratioTotal)
            : realTotal - sumRealWidths - 0.5 // TODO: why -0.5

      sumRealWidths += realWidth

      ret.dataColumns.push(realWidth)
    }

    return ret
}

function createHeaderRow(model: DataTableModel, columnWidths: any,  classes: DataTableClasses) {
  const
    selectionMode = model.rowSelectionOptions.mode,

    selectionColumn =
      selectionMode === 'none'
        ? null
        : <div className={classes.rowSelectionColumn} style={{ minWidth: columnWidths.selectorColumn }}>
            <div>
              {
                selectionMode === 'multi'
                  ? createSelectAllCheckbox(model)
                  : null
              }
            </div>
          </div>

  return (
    <div className={css('ReactVirtualized__Table__headerRow', classes.tableHead)}>
      {selectionColumn}
      {
        model.columns.map((column, columnIdx) =>
          createTableHeadCell(columnIdx, column, model, columnWidths.dataColumns[columnIdx], classes))
      }
    </div>
  )
}

function createTableHeadCell(columnIdx: number, column: DataTableColumnModel, model: DataTableModel, width: number, classes: DataTableClasses) {
  const
    sortable = model.columns[columnIdx].sortable,
    sortBy = model.sortBy,
    sortDesc = model.sortDesc,
    isSorted = sortBy !== null && sortBy === column.field,

    sortIcon = // TODO
      <div style={{ width: '20px', height: '20px' }}>
        {
          sortable && isSorted
            ? (sortDesc ? <SortDescIcon/> : <SortAscIcon/>)
            : null
        }
      </div>,

    onClick = 
      !sortable && column.field
        ? null
        : () => {
          model.api.changeSort(column.field, isSorted ? !sortDesc : false)
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

function createTableBodyRow(rowIndex: number, model: DataTableModel, classes: DataTableClasses) {
  const
    row: any = model.data[rowIndex],
    selectionMode = model.rowSelectionOptions.mode,
  
    selectionColumn =
      selectionMode === 'none'
        ? null
        : <div className={classes.rowSelectionColumn}>
            <div>{createSelectCheckbox(rowIndex, model)}
            </div>
          </div>

  return (
    <tr key={rowIndex} className={model.rowSelection.has(rowIndex) ? classes.selectedRow : null }>
      {selectionColumn}
      {
        model.columns.map((column, columnIdx) =>
          createTableBodyCell(columnIdx, model, row, classes))
      }
    </tr>
  )
}

function createTableBodyCell(columnIndex: number, model: DataTableModel, row: any, classes: DataTableClasses) {
  const column = model.columns[columnIndex]

  const className =
    column.align === 'center'
      ? css(classes.dataCell, classes.alignCenter)
      : column.align === 'end'
      ? css(classes.dataCell, classes.alignEnd)
      : classes.dataCell

  return (
    <div key={columnIndex} className={className}>
      {row[column.field]}
    </div>
  )
}

function createSelectCheckbox(index: number, model: DataTableModel) {
  const
    selectionMode = model.rowSelectionOptions.mode,
    checked = model.rowSelection.has(index),

    onChange =() => {
      let selectedRows: Set<number>
      
      if (selectionMode === 'single') {
        selectedRows = new Set([index])
      } else {
        selectedRows = new Set(model.rowSelection)

        if (checked) {
          selectedRows.delete(index)
        } else {
          selectedRows.add(index)
        }
      }

      model.api.changeRowSelection(selectedRows)
    }

  return (
    <Checkbox checked={checked} onChange={onChange}/>
  ) 
}

function createSelectAllCheckbox(model: DataTableModel) {
  const
    rowSelectionSize = model.rowSelection.size,
    checked = rowSelectionSize > 0 && rowSelectionSize === model.data.length,

    onChange =() => {
      const selectedRows: Iterable<number> =
        checked
          ? []
          : model.data.keys()

      model.api.changeRowSelection(selectedRows)
    }

  return (
    <Checkbox checked={checked} onChange={onChange}/>
  ) 
}

// --- exports ------------------------------------------------------

export default DataTableRenderer
