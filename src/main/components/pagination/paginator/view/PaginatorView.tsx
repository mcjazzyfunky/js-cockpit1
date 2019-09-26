// external import
import React, { KeyboardEvent } from 'react'
import { component } from 'js-react-utils'
import { TextField } from 'office-ui-fabric-react'

// internal imports
import getPaginatorClasses from './getPaginatorClasses'
import PaginatorViewProps from '../types/PaginatorViewProps'
import ArrowDoubleLeftIcon from '../../../../icons/ArrowDoubleLeftIcon' 
import ArrowDoubleRightIcon from '../../../../icons/ArrowDoubleRightIcon' 
import ArrowLeftIcon from '../../../../icons/ArrowLeftIcon' 
import ArrowRightIcon from '../../../../icons/ArrowRightIcon' 

// --- PaginatorView ------------------------------------------------

const PaginatorView = component<PaginatorViewProps>('PaginatorView', props => {
  const
    classes = getPaginatorClasses(),
    { pageIndex, pageSize, totalItemCount, onPageChange } = props,
    lastPageIndex = Math.ceil(totalItemCount / pageSize) - 1,
    firstButtonDisabled = pageIndex <= 0,
    previousButtonDisabled = pageIndex <= 0,
    nextButtonDisabled = pageIndex >= lastPageIndex,
    lastButtonDisabled = pageIndex >= lastPageIndex

  return (
    <div className={classes.container}>
      <button
        disabled={firstButtonDisabled}
        className={classes.button}
        onClick={
          onPageChange
            ? () => onPageChange({ type: 'pageChange', pageIndex: 0 })
            : undefined
        }
      >
        <ArrowDoubleLeftIcon/>
      </button>
      <button
        disabled={previousButtonDisabled}
        className={classes.button}
        onClick={
          onPageChange
            ? () => onPageChange({ type: 'pageChange', pageIndex: pageIndex -1 })
            :undefined
        }
      >
        <ArrowLeftIcon/>
      </button>
      <div className={classes.pageText1}>Page</div>
        <TextField
          value={String(pageIndex  + 1)}
          className={classes.textField}
          onKeyDown={
            onPageChange
              ? event => handleKeyDown(event, pageIndex, totalItemCount, pageSize, onPageChange)
              : undefined
          }
        />
      <div className={classes.pageText2}>of {lastPageIndex + 1}</div>
      <button
        disabled={nextButtonDisabled}
        className={classes.button}
        onClick={
          onPageChange
           ? () => onPageChange({ type: 'pageChange', pageIndex: pageIndex + 1 })
           : undefined
        }
      >
        <ArrowRightIcon/>
      </button>
      <button
        disabled={lastButtonDisabled}
        className={classes.button}
        onClick={
          onPageChange
            ? () => onPageChange({ type: 'pageChange', pageIndex: lastPageIndex })
            : undefined
        }
      >
        <ArrowDoubleRightIcon/>
      </button>
    </div>
  )
})

// --- helpers ------------------------------------------------------

function handleKeyDown(event: KeyboardEvent, pageIndex: number, totalItemCount: number, pageSize: number, onPageChange: Function) {
  if (event.keyCode === 13) {
    const
      target: any = event.nativeEvent.target,
      pageNo = parseFloat((target as any).value),
      lastPageIndex = Math.ceil(totalItemCount / pageSize) - 1

    if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > lastPageIndex + 1) {
      target.value = pageIndex + 1
    } else {
      onPageChange({ type: 'changePage', pageIndex: pageNo - 1 })
    }
  }
}

// --- exports ------------------------------------------------------

export default PaginatorView
