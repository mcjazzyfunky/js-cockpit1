// external imports
import { ITheme } from 'office-ui-fabric-react'
import Color from 'color'

// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleFieldSet -------------------------------------------------

const styleFieldSet = defineStyle(theme => ({
  container: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: '1rem 1rem 0 0.75rem',
  },

  title: {
    color: theme.palette.themePrimary,
    fontSize: theme.fonts.medium.fontSize,
    fontFamily: theme.fonts.medium.fontFamily,
    fontWeight: '600',
    padding: '0 0 1rem 0',
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
        textAlign: 'left',
        padding: '0 0.75rem 0 0',
        width: '120px',
      }
    }
  },

  innerLabel: {
    margin: '3px 0.25rem 0 0.25rem',
  }
}))

// --- exports ------------------------------------------------------

export default styleFieldSet
