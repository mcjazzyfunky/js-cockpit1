import React from 'react'
import { defineComponent } from 'js-react-utils'
import { ITheme, TextField } from 'office-ui-fabric-react'
import defineStyle from '../../../api/styling/defineStyle'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import ArrowDoubleLeftIcon from '../icons/ArrowDoubleLeftIcon'
import ArrowDoubleRightIcon from '../icons/ArrowDoubleRightIcon'
// --- PaginationBarStyle -------------------------------------------

const PaginationBarStyle = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    ...theme.fonts.medium,
  },

  startArea: {
  },

  centerArea: {
    flexGrow: 1,
  },

  endArea: {
  },

  button: {
    border: 'none',
    margin: 0,
    padding: "4px 4px",
    boxSizing: 'border-box',
    background: 'none',
    outline: 'none',
    height: '1.5rem',
    transform: 'translate(0, 7px)',

    selectors: {
      '&:hover': {
        backgroundColor: theme.semanticColors.buttonBackgroundHovered
      },
      '&:active': {
        backgroundColor: theme.semanticColors.buttonBackgroundChecked
      },
      '& svg': {
        transform: 'translate(0px, -2px)'
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
        height: '1.5rem',
      },
      '& .ms-TextField-field': {
        padding: '0 0.375rem'
      }
    }
  }
}))

// --- PaginationBar ------------------------------------------------

type PaginationBarProps = {
}

const PaginationBar = defineComponent<PaginationBarProps>({
  displayName: 'PaginationBar',

  render() {
    return (
      <PaginationBarStyle>
        {
          (classes: any) =>
            <div className={classes.container}>
              <div className={classes.startArea}>
                <button className={classes.button}><ArrowDoubleLeftIcon/></button>
                <button className={classes.button}><ArrowLeftIcon/></button>
                <div className={classes.pageText1}>Page</div>
                  <TextField value="1" className={classes.textField}/>
                <div className={classes.pageText2}>of 100</div>
                <button className={classes.button}><ArrowRightIcon/></button>
                <button className={classes.button}><ArrowDoubleRightIcon/></button>
              </div>
              <div className={classes.centerArea}>
                
              </div>
              <div className={classes.endArea}>
                Items 100-125 of 1.241
              </div>
            </div>
        }
      </PaginationBarStyle>
    )
  }
})

// --- exports ------------------------------------------------------

export default PaginationBar
