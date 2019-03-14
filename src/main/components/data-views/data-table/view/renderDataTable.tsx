// external imports
import React, { ReactElement } from 'react'
import { css, Checkbox, ITheme } from 'office-ui-fabric-react'
import { AutoSizer, Column, Table } from 'react-virtualized'

// internal imports
import styleDataTable from './styleDataTable'
import CssClassesOf from '../../../../styling/types/CssClassesOf'
import DataTableProps from '../types/DataTableProps'
import SortAscIcon from './SortAscIcon'
import SortDescIcon from './SortDescIcon'

type DataTableClasses = CssClassesOf<typeof styleDataTable>

// --- renderDataTable ----------------------------------------------

function renderDataTable(props: DataTableProps, ref: any) { // TODO
  const
    [selectedRows, setSelectionRows] = React.useState(() => new Set<number>()),
    runOnUpdater = React.useRef([] as Function[]),
    rowSelectionMode = props.rowSelectionOptions && props.rowSelectionOptions.mode || 'none'

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

                        return createTableBodyCell(rowIndex, columnIndex, props, props.data[rowIndex], classes, isSelected)}
                      }
                    />
                  )
               if (props.rowSelectionOptions && props.rowSelectionOptions.mode !== 'none') {
                  dataColumns.unshift(
                    <Column
                      width={columnWidths.selectorColumn}
                      dataKey={'-1'}
                      className={classes.cell}
                      cellRenderer={({ rowIndex }) => {
                        const isSelected = selectedRows.has(rowIndex)

                        let className = rowIndex % 2 === 1 ? classes.evenRow : null
                       
                        className = css(className, classes.dataCell)

                        if (isSelected) {
                          className = css(className, classes.selectedRow)
                        }

                        return (
                          <div className={className}>
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
    hasSelectorColumn = !!props.rowSelectionOptions && props.rowSelectionOptions.mode !== 'none',
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
    selectionMode = props.rowSelectionOptions ? props.rowSelectionOptions.mode : null,

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
          changeSort(column.field!, isSorted ? sortDir !== 'desc' : false)
        } 

  return (
    <div key={columnIdx} data-sortable={String(sortable)} onClick={onClick || undefined} style={{ width, minWidth: width, maxWidth: width }}>
      <div className={classes.tableHeadCellContent}>
        {column.title}
        {sortIcon}
      </div>
    </div>
  )
}

function createTableBodyCell(rowIndex: number, columnIndex: number, props: DataTableProps, row: any, classes: DataTableClasses, isSelected: boolean) {
  const column = props.columns[columnIndex]

  let className =
    column.align === 'center'
      ? css(classes.dataCell, classes.alignCenter)
      : column.align === 'end'
      ? css(classes.dataCell, classes.alignEnd)
      : classes.dataCell

  if (rowIndex % 2 === 1) {
    className = css(className, classes.evenRow)
  }

  if (isSelected) {
    className = css(className, classes.selectedRow)
  }

  return (
    <div key={columnIndex} className={className}>
      {column.field ? row[column.field] : null}
    </div>
  )
}

function createSelectRowCheckbox(rowIndex: number, props: DataTableProps, selectedRows: Set<number>, changeRowSelection: (selection: any) => void, classes: DataTableClasses) { // TODO
  const
    selectionMode = props.rowSelectionOptions ? props.rowSelectionOptions.mode : 'none',
    checked = selectedRows.has(rowIndex),

    onChange =() => {
      const newSelection = new Set(selectedRows)

      if (selectionMode === 'single') {
        newSelection.clear()
        newSelection.add(rowIndex)
      } else if (selectionMode === 'multi') {
        if (checked) {
          newSelection.delete(rowIndex)
        } else {
          newSelection.add(rowIndex)
        }
      }

      changeRowSelection(newSelection)
    }

  let className = classes.selectRowCheckBox

  if (rowIndex % 2 === 1) {
    className = css(className, classes.evenRow)
  }

  return (
    <div className={className}>
      <Checkbox className={classes.checkbox} checked={checked} onChange={onChange}/>
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

export default renderDataTable
