// external import
import Color from 'color'

// internal imports
import defineStyle2 from '../../../../styling/defineStyle2'

// --- styleDataTable -----------------------------------------------

const styleDataTable = defineStyle2(theme => ({
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
        margin: 0,
      },

      '& .ReactVirtualized__Table__rowColumn:first-of-type': {
        marginLeft: '1px',
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
        padding: '4px',
        color: theme.palette.black,
        //backgroundColor: theme.palette.neutralLighter,
        borderWidth: '1px 0 1px 1px',
        borderColor: theme.palette.neutralTertiary,
        borderStyle: 'solid',
        fontFamily: theme.fonts.medium.fontFamily,
        fontSize: theme.fonts.medium.fontSize,
        fontWeight: 600,
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
            backgroundColor: theme.palette.neutralLighter,
          },

          ':active': {
            backgroundColor: theme.palette.neutralLight,
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
    padding: '4px 0 0 5px',
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
        fontFamily: theme.fonts.medium.fontFamily,
        fontSize: theme.fonts.medium.fontSize,
      },
    }
  },

  tableRow: {
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: theme.fonts.medium.fontSize,
    verticalAlign: 'center',
  },

  evenRow: {
    backgroundColor: theme.palette.neutralLighterAlt,
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
    backgroundColor: Color(theme.palette.themeLight).lighten(0.05),
    //backgroundColor: Color.rgb(255, 244, 202).darken(0.05),

    selectors: {
      '&[class*="evenRow"]': {
        backgroundColor: theme.palette.themeLight,
        //backgroundColor: Color.rgb(255, 244, 202).darken(0.15),
      }
    }
  },

  checkbox: {
    selectors: {
      '& .ms-Checkbox-label': {
        backgroundColor: theme.palette.white,
        width: '20px'
      }
    }
  }
}))

// --- exports ------------------------------------------------------

export default styleDataTable
