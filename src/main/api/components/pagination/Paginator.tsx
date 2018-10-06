// internal imports
import defineStyle from '../../styling/defineStyle'

import ArrowDoubleLeftIcon from '../../../internal/components/icons/ArrowDoubleLeftIcon' 
import ArrowDoubleRightIcon from '../../../internal/components/icons/ArrowDoubleRightIcon' 
import ArrowLeftIcon from '../../../internal/components/icons/ArrowLeftIcon' 
import ArrowRightIcon from '../../../internal/components/icons/ArrowRightIcon' 

// external imports
import React from 'react'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec'
import { DefaultButton, ITheme, TextField } from 'office-ui-fabric-react'

// --- PaginatorStyle -----------------------------------------------

const PaginatorStyle = defineStyle((theme: ITheme) => ({
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

    selectors: {
      '&:hover': {
        backgroundColor: theme.semanticColors.buttonBackgroundHovered
      },
      '&:active': {
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
        padding: '0.25rem 0.5rem'
      }
    }
  }
}))


// --- Paginator ----------------------------------------------------

type PaginatorProps = {
  pageIndex: number,
  pageSize: number,
  totalItemCount: number, 
}

const Paginator = defineComponent<PaginatorProps>({
  displayName: 'Paginator',

  properties: {
    pageIndex: {
      type: Number,
      validate: Spec.nonnegativeInteger,
      required: true
    },

    pageSize: {
      type: Number,
      validate: Spec.positiveInteger,
      required: true
    },

    totalItemCount: {
      type: Number,
      validate: Spec.nonnegativeInteger,
      required: true
    },
  },

  render(props: PaginatorProps) {
    return PaginatorRenderer.render(props)
  }
})

// --- helpers ----------------------------------------------------

function getPaginatorData(props: PaginatorProps) {
  return props
}

// --- data models -------------------------------------------------

type PaginatorData = PaginatorProps

// --- PaginatorRenderer --------------------------------------------

const PaginatorRenderer = {
  render(data: PaginatorData) {
    return (
      <PaginatorStyle>
        {
          (classes: any) =>
            <div className={classes.container}>
              <button className={classes.button}><ArrowDoubleLeftIcon/></button>
              <button className={classes.button}><ArrowLeftIcon/></button>
              <div className={classes.pageText1}>Page</div>
                <TextField value={String(data.pageIndex  + 1)} className={classes.textField}/>
              <div className={classes.pageText2}>of 100</div>
              <button className={classes.button}><ArrowRightIcon/></button>
              <button className={classes.button}><ArrowDoubleRightIcon/></button>
            </div>
        }
      </PaginatorStyle>
    )
  }
}

// --- exports ------------------------------------------------------

export default Paginator

