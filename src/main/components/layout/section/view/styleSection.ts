// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleSection -------------------------------------------------

const styleSection = defineStyle(theme => ({
  container: {
    padding: '0.5rem 0.75rem',
  },

  title: {
    color: theme.palette.neutralPrimary,
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    padding: '0 0 0.5rem 0',
  },

  content: {
    padding: '0 0 0 1rem'
  }
}))

// --- exports ------------------------------------------------------

export default styleSection
