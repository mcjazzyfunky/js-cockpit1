// internal imports
import { PaginatorData } from './Paginator'
import defineStyle from '../../styling/defineStyle'
import ActionEvent from '../../events/ActionEvent'
import ArrowDoubleLeftIcon from '../../icons/ArrowDoubleLeftIcon' 
import ArrowDoubleRightIcon from '../../icons/ArrowDoubleRightIcon' 
import ArrowLeftIcon from '../../icons/ArrowLeftIcon' 
import ArrowRightIcon from '../../icons/ArrowRightIcon' 

// external import
import React, { KeyboardEvent, ReactNode } from 'react'
import { ITheme, TextField } from 'office-ui-fabric-react'

// --- PaginatorStyle -----------------------------------------------

const styledPaginator = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  },
  
  button: {
    border: 'none',
    margin: 0,
    padding: "4px 4px",
    boxSizing: 'border-box',
    background: 'none',
    outline: 'none',
    height: '32px',
    cursor: 'pointer',

    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: '0.7',
      },

      '&:hover:not(:disabled)': {
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


// --- PaginatorRenderer --------------------------------------------

const PaginatorRenderer = {
  render(data: PaginatorData): ReactNode {
    const
      { pageIndex, pageSize, totalItemCount, onAction } = data,
      lastPageIndex = Math.floor(totalItemCount / pageSize),
      firstButtonDisabled = pageIndex <= 0,
      previousButtonDisabled = pageIndex <= 0,
      nextButtonDisabled = pageIndex >= lastPageIndex,
      lastButtonDisabled = pageIndex >= lastPageIndex

    return styledPaginator((classes: any) =>
      <div className={classes.container}>
        <button
          disabled={firstButtonDisabled}
          className={classes.button}
          onClick={onAction ? () => handleAction(0, onAction) : null}
        >
          <ArrowDoubleLeftIcon/>
        </button>
        <button
          disabled={previousButtonDisabled}
          className={classes.button}
          onClick={onAction ? () => handleAction(pageIndex - 1, onAction) : null}
        >
          <ArrowLeftIcon/>
        </button>
        <div className={classes.pageText1}>Page</div>
          <TextField
            value={String(data.pageIndex  + 1)}
            className={classes.textField}
            onKeyDown={onAction ? event => handleKeyDown(event, onAction, pageIndex, lastPageIndex) : null}
          />
        <div className={classes.pageText2}>of {lastPageIndex + 1}</div>
        <button
          disabled={nextButtonDisabled}
          className={classes.button}
          onClick={onAction ? () => handleAction(pageIndex + 1, onAction) : null}
        >
          <ArrowRightIcon/>
        </button>
        <button
          disabled={lastButtonDisabled}
          className={classes.button}
          onClick={onAction ? () => handleAction(lastPageIndex, onAction) : null}
        >
          <ArrowDoubleRightIcon/>
        </button>
      </div>
    )
  }
}

// --- helpers ------------------------------------------------------

function handleAction(pageIndex: number, onAction: ((event: ActionEvent<number>) => void)) {
  const event: ActionEvent = {
    type: 'action',
    name: 'pageIndex',
    value: pageIndex
  }

  onAction(event)
}

function handleKeyDown(
  event: KeyboardEvent ,
  onAction: ((event: ActionEvent<number>) => void),
  pageIndex: number,
  lastPageIndex: number) {

  console.log('juhu', event)

  if (event.keyCode === 13) {
    const
      target: any = event.nativeEvent.target,
      value: any = parseFloat((target as any).value)

    if (!Number.isInteger(value) || value < 1 || value > lastPageIndex + 1) {
      target.value = pageIndex + 1
    } else {
      handleAction(value - 1, onAction)
    }
  }
}

// --- exports ------------------------------------------------------

export default PaginatorRenderer
