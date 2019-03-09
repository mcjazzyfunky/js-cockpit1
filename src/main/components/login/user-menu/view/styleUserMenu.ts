// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleUserMenu ------------------------------------------------

const styleUserMenu = defineStyle({
  container: {
    display: 'flex',
    adjustItems: 'center',
  },

  avatar: {
    width: '20px',
    height: '20px',
    margin: '0 0.5rem',
  },

  displayName: {
    margin: '0 1rem 0 0',
  }
})

// --- exports ------------------------------------------------------

export default styleUserMenu
