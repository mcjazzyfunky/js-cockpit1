// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleDataTable -----------------------------------------------

const styleDataTable = defineStyle(theme => ({
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
        margin: 0
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
        //backgroundColor: theme.palette.neutralLighter,
        borderWidth: '1px 0 1px 1px',
        borderColor: theme.palette.neutralTertiary,
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
    fontWeight: '600',
    whiteSpace: 'nowrap',
    position: 'relative',
  },

  selectAllRowsCheckBox: {
    padding: '5px 0 0 4px',
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
    backgroundColor: theme.palette.themeLighter
    //backgroundColor: 'rgb(255, 244, 202)'
  }
}))

// --- exports ------------------------------------------------------

export default styleDataTable
