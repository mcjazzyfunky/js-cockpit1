// internal imports
import { PaginatorModel } from './Paginator'
import defineStyle from '../../styling/defineStyle'
import ArrowDoubleLeftIcon from '../../icons/ArrowDoubleLeftIcon' 
import ArrowDoubleRightIcon from '../../icons/ArrowDoubleRightIcon' 
import ArrowLeftIcon from '../../icons/ArrowLeftIcon' 
import ArrowRightIcon from '../../icons/ArrowRightIcon' 

// external import
import React, { KeyboardEvent, MouseEvent, ReactNode } from 'react'
import { ITheme, TextField } from 'office-ui-fabric-react'

// --- PaginatorStyle -----------------------------------------------

const stylePaginator = defineStyle((theme: ITheme) => ({
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


// --- PaginatorRenderer --------------------------------------------

const PaginatorRenderer = {
  render(model: PaginatorModel): ReactNode {
    const
      { pageIndex, pageSize, totalItemCount, api } = model,
      lastPageIndex = Math.ceil(totalItemCount / pageSize) - 1,
      firstButtonDisabled = pageIndex <= 0,
      previousButtonDisabled = pageIndex <= 0,
      nextButtonDisabled = pageIndex >= lastPageIndex,
      lastButtonDisabled = pageIndex >= lastPageIndex

    return stylePaginator(classes =>
      <div className={classes.container}>
        <button
          disabled={firstButtonDisabled}
          className={classes.button}
          onClick={() => api.changePage(0)}
        >
          <ArrowDoubleLeftIcon/>
        </button>
        <button
          disabled={previousButtonDisabled}
          className={classes.button}
          onClick={() => api.changePage(model.pageIndex - 1)}
        >
          <ArrowLeftIcon/>
        </button>
        <div className={classes.pageText1}>Page</div>
          <TextField
            value={String(model.pageIndex  + 1)}
            className={classes.textField}
            onKeyDown={event => handleKeyDown(event, model)}
          />
        <div className={classes.pageText2}>of {lastPageIndex + 1}</div>
        <button
          disabled={nextButtonDisabled}
          className={classes.button}
          onClick={() => api.changePage(model.pageIndex + 1)}
        >
          <ArrowRightIcon/>
        </button>
        <button
          disabled={lastButtonDisabled}
          className={classes.button}
          onClick={() => api.changePage(lastPageIndex)}
        >
          <ArrowDoubleRightIcon/>
        </button>
      </div>
    )
  }
}

// --- helpers ------------------------------------------------------

function handleKeyDown(event: KeyboardEvent, model: PaginatorModel) {
  if (event.keyCode === 13) {
    const
      target: any = event.nativeEvent.target,
      pageNo = parseFloat((target as any).value),
      lastPageIndex = Math.ceil(model.totalItemCount / model.pageSize) - 1

    if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > lastPageIndex + 1) {
      target.value = model.pageIndex + 1
    } else {
      model.api.changePage(pageNo - 1)
    }
  }
}

// --- exports ------------------------------------------------------

export default PaginatorRenderer
