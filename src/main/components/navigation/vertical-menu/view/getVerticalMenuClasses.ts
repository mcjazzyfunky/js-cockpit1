// internal imports
import defineStyles from '../../../../styling/defineStyles'

// --- styleVerticalMenu ---------------------------------------------------

const getVerticalMenuClasses = defineStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    //backgroundColor: theme.palette.neutralLight,
    marginRight: '3px',

    // borderWidth: '0 1px 0 0',
    // borderStyle: 'solid',
    // borderColor: theme.palette.neutralQuaternary,

    selectors: {
      '& .ms-Nav-compositeLink': {
        backgroundColor: 'transparent !important'
      },

      '& .ms-Nav-compositeLink.is-expanded.is-selected *': {
        fontWeight: 600,
        backgroundColor: `${theme.palette.neutralLighter} !important`,
      },

      '& .ms-Nav-group.is-expanded': {
        borderWidth: '0 0 1px 0',
        borderColor: theme.palette.neutralLight,
        borderStyle: 'solid'
      },

      '& .ms-Nav-group.is-expanded:last-child': {
        borderWidth: 0,
      },

      '& .ms-Nav-link:hover': {
        backgroundColor: `${theme.palette.neutralLighter} !important`
      }
    }
  },

  header: {
    flex: 0,
    padding: '11px 20px 0 20px',
    fontSize: theme.fonts.medium.fontSize,
    fontWeight: 600,
    fontFamily: theme.fonts.medium.fontFamily,
  },

  navigation: {
    flex: 1,
    width: '12rem',
    padding: '0 0 0 1px',
    margin: '8px 0 1px 1px',
    boxSizing: 'border-box',
    borderColor: theme.palette.neutralLight,
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',

    selectors: {
      '*': {
        color: theme.palette.neutralDark,
      },

      '.ms-Nav-groupContent': {
        backgroundColor: 'transparent',
        padding: '0 !important',
        margin: '0 !important',
        marginTop: '0 !important',
      },

      '& .ms-Nav-chevronButton': {
        fontSize: theme.fonts.mediumPlus.fontSize,
        fontFamily: theme.fonts.mediumPlus.fontFamily,
        backgroundColor: 'transparent',
        borderWidth: '0 0 1px 0',
        borderColor: theme.palette.neutralQuaternaryAlt,
        borderStyle: 'solid',
        marginBottom: '0',
      },

      '.ms-Nav-navItems': {
        margin: '0.325rem 0 1rem 0',
      },

      '.ms-Nav-compositeLink.is-expanded.is-selected': {

        selectors: {
          '*': {
            cursor: 'default !important',
          },

          '> button:after': {
            borderColor: theme.palette.themeSecondary,
          },
        }
      }
    }
  }
}))

// --- exports -------------------------------------------------------

export default getVerticalMenuClasses
