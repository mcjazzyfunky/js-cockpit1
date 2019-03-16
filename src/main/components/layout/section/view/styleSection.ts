// internal imports
import defineStyle from '../../../../styling/defineStyle'

// external imports
import Color from 'color'

// --- styleSection -------------------------------------------------

const styleSection = defineStyle(theme => ({
  container: {
    padding: '1rem 1rem 0.75rem 0.75rem',
  },

  title: {
    color: theme.palette.themeTertiary,
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    fontWeight: 'bold',
    padding: '0 0 0.5rem 0',
  },

  content: {
    padding: '0 0 0 1rem'
  }
}))

// --- exports ------------------------------------------------------

export default styleSection
