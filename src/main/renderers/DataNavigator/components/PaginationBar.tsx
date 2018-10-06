import React from 'react'
import { defineComponent } from 'js-react-utils'
import { DefaultButton, ITheme, TextField } from 'office-ui-fabric-react'
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
  },

  startArea: {
    display: 'flex',
    alignItems: 'center',
  },

  centerArea: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },

  pageSizeText: {
    padding: '0 0.5rem 0 3rem',
  },

  pageSizeSelector: {
    // backgroundColor: 'transparent',
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
    height: '32px',
    // color: theme.palette.themePrimary,

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
        height: '1.5rem',
      },

      '& .ms-TextField-field': {
        padding: '0 0.375rem',
        ...theme.fonts.smallPlus
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
                <label className={classes.pageSizeText}>Items/Page</label>
                <DefaultButton
                  text="25"
                  className={classes.pageSizeSelector}
                  menuProps={{
                    items: [
                      { key: '25', name: '25' },
                      { key: '50', name: '50' },
                      { key: '100', name: '100' },
                      { key: '250', name: '250' },
                      { key: '500', name: '500' },
                    ]
                  }}
                />
              </div>
              <div className={classes.endArea}>
                Items 100-125 of 1,241
              </div>
            </div>
        }
      </PaginationBarStyle>
    )
  }
})

// --- exports ------------------------------------------------------

export default PaginationBar
