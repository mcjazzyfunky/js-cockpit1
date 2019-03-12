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
    backgroundColor: theme.palette.neutralQuaternaryAlt,
    position: 'absolute',

    selectors: {
      '& > *': {
        borderRadius: '6px'
      },

      '& [data-component="LoginForm:inner"]': {
        marginTop: '-5%',
      }
    }
  },

  inner: {
    position: 'relative',
    backgroundColor: theme.palette.white,
    display: 'flex',
    width: '350px',
    flexDirection: 'column',
    minHeight: '430px',
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

  content: {
    flexGrow: 1,
    padding: '1rem 1.5rem',
  },

  footer: {
    padding: '1rem 1.5rem',
  },

  remember: {
    margin: '1.25rem 0 0 0',
  },

  generalError: {
    marginTop: '2rem',
    color: theme.semanticColors.errorText
  },

  submitButton: {
    width: '100%'
  },

  loadingIndicator: {
    display: 'inline-block',
    margin: '0 0 0 0.75rem',
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
