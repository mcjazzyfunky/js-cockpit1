// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getFieldSetClasses --------------------------------------------

const getFieldSetClasses = defineStyle(theme => ({
  container: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: '1rem 1rem 0 0.75rem',
  },

  title: {
    display: 'inline-block',
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    margin: '0 0 1rem 0',
  },

  defaultContent: {
    display: 'flex',
    padding: '0 0 0.5rem 1rem',

    selectors: {
      '& > *': {
        marginBottom: '8px'
      }
    }
  },

  compactContent: {
    padding: '0 0 0 1rem',
    display: 'flex'
  },

  layoutTable: {
    selectors: {
      '& > tbody > tr > td': {
        verticalAlign: 'top',
        padding: '2px',
      },

      '& > tbody > tr > td:first-child': {
        textAlign: 'right',
        padding: '0 0.75rem 0 0',
        width: '120px',
      }
    }
  },

  innerLabel: {
    margin: '3px 0.25rem 0 0.25rem',
  }
}))

// --- exports -------------------------------------------------------

export default getFieldSetClasses
