// internal imports
import defineStyles from '../../../../styling/defineStyles'

// --- getDataExplorerSearchBarClasses -------------------------------

const getDataExplorerSearchBarClasses = defineStyles(theme => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
    },

    searchBox: {
      width: '220px',
      height: '30px',
      paddingRight: '2px',
    },

    advancedFilter: {
      margin: '0 16px',

      selectors: {
        '& *': {
          color: theme.palette.black,
          backgroundColor: 'transparent !important',
        },

        '&:hover': {
          backgroundColor: theme.palette.neutralLight
        },
        
        '&:active': {
          backgroundColor: theme.palette.neutralQuaternary
        }
      }
    },

    filterButton: {
      height: '30px',
      marginLeft: '8px',

      selectors: {
        ':hover': {
          color: theme.palette.white,
          backgroundColor: theme.palette.neutralLight,
        },
        
        ':active': {
          color: theme.palette.white + ' !important',
          backgroundColor: theme.palette.neutralQuaternary,
        }
      }
    },

    filterButtonActive: {
      color: theme.palette.white + ' !important',
      backgroundColor: theme.palette.neutralQuaternary,
    },

    icon: {
      color: theme.palette.themePrimary + ' !important' // TODO
    },

    filterContainer: {
    }
  }
})

// --- exports -------------------------------------------------------

export default getDataExplorerSearchBarClasses
