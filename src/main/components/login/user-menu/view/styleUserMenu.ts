// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleUserMenu ------------------------------------------------

const styleUserMenu = defineStyle(theme => ({
  container: {
    display: 'flex',
    adjustItems: 'center',
  },

  avatar: {
    width: '20px',
    height: '20px',
    margin: '0 0.625rem',
  },

  displayName: {
    fontSize: theme.fonts.medium.fontSize,
    fontFamily: theme.fonts.medium.fontFamily,
    margin: '1px 1.25rem 0 0',
  }
}))

// --- exports ------------------------------------------------------

export default styleUserMenu
