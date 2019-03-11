// external import
import Color from 'color'

// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleLogoutButton ------------------------------------------------

const styleLogoutButton = defineStyle(theme => ({
  container: {
  },

  logoutButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.themePrimary,
    border: 'none',
    width: '46px',
    height: '46px',
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    //borderWidth: '0 0 0 0.5px',
    //borderStyle: 'solid',
    //borderColor: Color(theme.palette.themePrimary).lighten(0.5),
    
    selectors: {
      '&:hover': {
        backgroundColor: Color(theme.palette.themePrimary).darken(0.2)
      },

      '&:active': {
        backgroundColor: Color(theme.palette.themePrimary).darken(0.1)
      }
    }
  }
}))

// --- exports ------------------------------------------------------

export default styleLogoutButton
