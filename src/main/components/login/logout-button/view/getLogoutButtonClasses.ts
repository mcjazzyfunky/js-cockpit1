// external import
import Color from 'color'

// internal imports
import defineStyles from '../../../../styling/defineStyles'

// --- getLogoutButtonClasses ----------------------------------------

const getLogoutButtonClasses = defineStyles(theme => ({
  root: {
  },

  button: {
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

// --- exports -------------------------------------------------------

export default getLogoutButtonClasses
