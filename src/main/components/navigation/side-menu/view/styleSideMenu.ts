// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleSideMenu --------------------------------------------------

const styleSideMenu = defineStyle(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
  },

  header: {
    flex: 0,
    padding: '11px 20px',
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    borderColor: theme.palette.neutralLight,
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
  },

  navigation: {
    flex: 1,
    width: '12rem',
    padding: '0 8px',
    margin: '6px',
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
    
      '.ms-Nav-navItems *': {
      //  backgroundColor: 'transparent !important',
      },

      '& .ms-Nav-chevronButton': {
        fontSize: theme.fonts.mediumPlus.fontSize,
        fontFamily: theme.fonts.mediumPlus.fontFamily,
        //color: theme.palette.neutralDark,
        backgroundColor: 'transparent',

        borderWidth: '0 0 1px 0',
        borderColor: theme.palette.neutralQuaternaryAlt,
        borderStyle: 'solid',
        marginBottom: '0',

        selectors: {
          ':hover': {
            //backgroundColor: theme.palette.neutralLight, 
          }
        }
      },

      '.ms-Nav-compositeLink.is-expanded': {
        selectors: {
          ':hover': {
            //backgroundColor: theme.palette.neutralLight + ' !important',
          },
          
          ':active': {
            //backgroundColor: theme.palette.neutralQuaternary + ' !important',
          }
        }
      },

      '.ms-Nav-navItems': {
        margin: '0.325rem 0 1rem 0',
      },

      '.ms-Nav-compositeLink.is-expanded.is-selected': {
        //backgroundColor: theme.palette.themeLighterAlt + ' !important',

        selectors: {
          '*': {
            //color: theme.palette.black + ' !important',
            //fontWeight: '600 !important',
            cursor: 'default !important',
          },

          '> button:after': {
            borderColor: theme.palette.themeSecondary,
          },

          ':hover *': {
            //color: theme.palette.black + ' !important',
            //backgroundColor: theme.palette.themeLighterAlt + ' !important',
          }
        }
      }
    }
  }
}))

// --- exports ------------------------------------------------------

export default styleSideMenu
