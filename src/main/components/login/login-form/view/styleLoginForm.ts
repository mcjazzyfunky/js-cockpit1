// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleLoginForm -----------------------------------------------

const styleLoginForm = defineStyle(theme => ({
  container: {
    backgroundColor: theme.palette.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralSecondary,
    position: 'relative',
  },

  containerFullSize: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.neutralLight,
    position: 'absolute',

    selectors: {
      '& > div > *': {
        borderRadius: '8px'
      },

      '& [data-component="LoginForm:inner"]': {
       //marginTop: '-5%',
      }
    }
  },

  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  card: {
    backgroundColor: theme.palette.white,
    //display: 'flex',
    minWidth: '350px',
    flexDirection: 'column',
    minHeight: '130px',
    textAlign: 'left',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },

  header: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternaryAlt,
    padding: '1rem 1.5rem',
  },

  defaultHeader: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternaryAlt,
    padding: '0.75rem 1.5rem',
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

  footer: {
    padding: '1rem 1.5rem',
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
    padding: '1rem 1.5rem 0 1.5rem',
  },

  fields: {
    display: 'table',
    flexGrow: 1,
  },

  field: {
    display: 'table-row',

    selectors: {
      '& > :first-child': {
        display: 'table-cell',
        padding: '3px 1rem 4px 2px',
        textAlign: 'right',
        whiteSpace: 'nowrap',
        width: '0%',
        verticalAlign: 'top',
      },

      '& > :nth-child(2)': {
        display: 'table-cell',
        padding: '2px',
        width: '100%',
      },
    }
  },

  above: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    color: theme.palette.neutralSecondary,
    padding: '1.25rem 0',
    textAlign: 'center',
  },

  below: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    color: theme.palette.neutralSecondaryAlt,
    padding: '0.75rem 0',
    textAlign: 'center',
  }
}))

// --- exports ------------------------------------------------------

export default styleLoginForm
