// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { Spec } from 'js-spec'
import { TextField } from 'office-ui-fabric-react'

// internal imports
import defineStyles from '../../../styling/defineStyles'
import useForceUpdate from '../../shared/hooks/useForceUpdate'

import usePaginationCtrl from '../hooks/usePagination'
import ArrowDoubleLeftIcon from '../../../icons/ArrowDoubleLeftIcon' 
import ArrowDoubleRightIcon from '../../../icons/ArrowDoubleRightIcon' 
import ArrowLeftIcon from '../../../icons/ArrowLeftIcon' 
import ArrowRightIcon from '../../../icons/ArrowRightIcon' 

// derived imports
const { useCallback, useEffect, useState } = React

// --- components ----------------------------------------------------

const Paginator = component<PaginatorProps>({
  displayName: 'Paginator',
  
  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validatePaginatorProps) },
  
    render: PaginatorView
})

// --- types ---------------------------------------------------------

type PaginatorProps = {
}

// --- validation ----------------------------------------------------

const validatePaginatorProps = Spec.checkProps({})

// --- views ---------------------------------------------------------

function PaginatorView() {
  const
    forceUpdate = useForceUpdate(), 
    ctrl = usePaginationCtrl(),
    classes = getPaginatorClasses(),
    pageIndex = ctrl.getPageIndex(),
    pageSize = ctrl.getPageSize(),
    totalItemCount = ctrl.getTotalItemCount(),
    lastPageIndex = Math.ceil(totalItemCount / pageSize) - 1,
    firstButtonDisabled = pageIndex <= 0,
    previousButtonDisabled = pageIndex <= 0,
    nextButtonDisabled = pageIndex >= lastPageIndex,
    lastButtonDisabled = pageIndex >= lastPageIndex

  useEffect(() => {
    const unsubscribe = ctrl.subscribe(() => {
      forceUpdate()
    })

    return unsubscribe
  }, [ctrl, forceUpdate])

  return (
    <div className={classes.container}>
      <button
        disabled={firstButtonDisabled}
        className={classes.button}
        onClick={() => ctrl.moveToPage(0)}
      >
        <ArrowDoubleLeftIcon/>
      </button>
      <button
        disabled={previousButtonDisabled}
        className={classes.button}
        onClick={ () => ctrl.moveToPage(ctrl.getPageIndex() - 1) }
      >
        <ArrowLeftIcon/>
      </button>
      <div className={classes.pageText1}>Page</div>
        <TextField
          value={String(pageIndex  + 1)}
          className={classes.textField}
          onKeyDown={() => console.log('onKeyDown')}
        />
      <div className={classes.pageText2}>of {lastPageIndex + 1}</div>
      <button
        disabled={nextButtonDisabled}
        className={classes.button}
        onClick={() => ctrl.moveToPage(ctrl.getPageIndex() + 1)}
      >
        <ArrowRightIcon/>
      </button>
      <button
        disabled={lastButtonDisabled}
        className={classes.button}
        onClick={() => ctrl.moveToPage(Math.floor((ctrl.getTotalItemCount() - 1) / ctrl.getPageSize()))}
      >
        <ArrowDoubleRightIcon/>
      </button>
    </div>
  )
}

function handleKeyDown(event: KeyboardEvent, pageIndex: number, totalItemCount: number, pageSize: number, onPageChange: Function) {
  if (event.keyCode === 13) {
    const
      target: any = event.target,
      pageNo = parseFloat((target as any).value),
      lastPageIndex = Math.ceil(totalItemCount / pageSize) - 1

    if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > lastPageIndex + 1) {
      target.value = pageIndex + 1
    } else {
      onPageChange({ type: 'changePage', pageIndex: pageNo - 1 })
    }
  }
}

// --- styles --------------------------------------------------------

const getPaginatorClasses = defineStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    fontSize: theme.fonts.medium.fontSize,
    fontFamily: theme.fonts.medium.fontFamily,
    ...theme.fonts.medium
  },
  
  button: {
    border: 'none',
    margin: 0,
    padding: "4px 4px",
    boxSizing: 'border-box',
    background: 'none',
    outline: 'none',
    height: '26x',
    width: '28px',
    cursor: 'pointer',

    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: '0.7',
      },

      '&:hover:not(:disabled)': {
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: theme.semanticColors.buttonBackgroundHovered
      },

      '&:active:not(:disabled)': {
        backgroundColor: theme.semanticColors.buttonBackgroundChecked,
      },

      '& svg': {
        transform: 'translate(0px, 2px)'
      },

      '&::-moz-focus-inner': {
        border: 0
      }
    }
  },

  pageText1: {
    display: 'inline-block',
    marginLeft: '0.25rem',
  },

  pageText2: {
    display: 'inline-block',
    marginRight: '0.25rem',
  },

  textField: {
    width: '4rem',
    margin: '0 0.5rem',
    display: 'inline-block',

    selectors: {
      '& .ms-TextField-fieldGroup': {
        height: '1.75rem',
      },

      '& .ms-TextField-field': {
        padding: '0.25rem 0.5rem',
        ...theme.fonts.medium,
      }
    }
  }
}))

// --- exports -------------------------------------------------------

export default Paginator
