// external import
import Color from 'color'

// internal imports
import defineStyle2 from '../../../../styling/defineStyle2'

// --- styleLogoutButton ------------------------------------------------

const styleLogoutButton = defineStyle2(theme => ({
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
