// internal imports
import defineStyle from '../../../../styling/defineStyle'

// external imports
import Color from 'color'

// --- styleSection -------------------------------------------------

const styleSection = defineStyle(theme => ({
  container: {
    padding: '1rem 1rem 0.25rem 0.75rem',
  },

  title: {
    color: theme.palette.themeSecondary,
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    fontWeight: 'bold',
    padding: '0 0 1rem 0',
  },

  content: {
    padding: '0 0 0 1rem'
  },

  layoutTable: {
    selectors: {
      '& > tbody > tr > td': {
        verticalAlign: 'top',
        padding: '2px',
      },

      '& > tbody > tr > td:first-child': {
        textAlign: 'right',
        padding: '2px 0.25rem 0 0',
      }
    }
  },

  innerLabel: {
    margin: '2px 0.25rem 0 0.5rem'
  }
}))

// --- exports ------------------------------------------------------

export default styleSection
