// internal imports
import defineStyle from '../../../../styling/defineStyle'

// external imports
import Color from 'color'

// --- styleFieldSet -------------------------------------------------

const styleFieldSet = defineStyle(theme => ({
  container: {
    padding: '1rem 1rem 0 0.75rem',
  },

  title: {
    color: theme.palette.neutralSecondaryAlt,
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    fontWeight: 'bold',
    padding: '0 0 1rem 0',
  },

  defaultContent: {
    padding: '0 0 0.5rem 1rem',

    selectors: {
      '& > *': {
        marginBottom: '8px'
      }
    }
  },

  compactContent: {
    padding: '0 0 0 1rem',
  },

  layoutTable: {
    selectors: {
      '& > tbody > tr > td': {
        verticalAlign: 'top',
        padding: '2px',
      },

      '& > tbody > tr > td:first-child': {
        textAlign: 'right',
        padding: '3px 0.75rem 0 0',
        //width: '120px'
      }
    }
  },

  innerLabel: {
    margin: '3px 0.25rem 0 0.25rem'
  }
}))

// --- exports ------------------------------------------------------

export default styleFieldSet
