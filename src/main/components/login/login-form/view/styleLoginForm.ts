// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleLoginForm -----------------------------------------------

const styleLoginForm = defineStyle(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    userSelect: 'none',
  },

  containerFullSize: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5%)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'auto',
    userSelect: 'none',
    boxSizing: 'border-box',
    paddingTop: '30px',
  },

  inner: {
    display: 'block',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '10px 0 0 0'
  },

  card: {
    minWidth: '350px',
    flexDirection: 'column',
    minHeight: '130px',
    textAlign: 'left',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: '10px',
  },

  header: {
    borderWidth: '0 0 0.5px 0',
    borderStyle: 'dashed',
    borderColor: theme.palette.themeTertiary,
    padding: '0.25rem 1.5rem 0.75rem 1.5rem',
    justifyContent: 'center',
    display: 'flex',
  },

  defaultHeader: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'dashed',
    borderColor: theme.palette.themeTertiary,
    padding: '0.75rem 1.5rem 1.25rem 1.5rem',
    textAlign: 'center',
    fontSize: theme.fonts.xLarge.fontSize,
    fontFamily: theme.fonts.xLarge.fontFamily,
    color: theme.palette.themePrimary,
  },

  defaultIcon: {
    height: '40px',
    width: '40px',
    color: theme.palette.themePrimary,
  },

  headline: {
    margin: '1rem 1rem 0.5rem 1rem',
    fontFamily: theme.fonts.large.fontFamily,
    fontSize: theme.fonts.large.fontSize,
    color: theme.palette.neutralPrimary,
  },

  remember: {
    margin: '1.25rem 0 0 0',
  },

  generalError: {
    margin: '0.5rem 0',
    color: theme.semanticColors.errorText
  },

  submitButton: {
    width: '100%'
  },

  loadingIndicator: {
    display: 'inline-block',
    margin: '0 0 0 0.75rem',
  },

  content: {
    padding: '1rem 0 0 0',
  },

  fields: {
    display: 'block',
  },
  
  fieldsWithHorizontalLabel: {
    padding: '0 1rem 0 1.5rem',
    display: 'table',
    flexGrow: 1,
    
    selectors: {
      '& > div': {
        display: 'table-row'
      },
    
      '& > div > :first-child': {
        display: 'table-cell',
        padding: '3px 1rem 4px 2px',
        textAlign: 'right',
        whiteSpace: 'nowrap',
        width: '0%',
        verticalAlign: 'top',
      },

      '& > div > :nth-child(2)': {
        display: 'table-cell',
        padding: '3px',
        minWidth: '250px',
        width: '100%',
      },
    }
  },

  footer: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    color: theme.palette.neutralSecondaryAlt,
    padding: '1rem 0 0.75rem 0',
    textAlign: 'center',
  }
}))

// --- exports ------------------------------------------------------

export default styleLoginForm
