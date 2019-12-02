// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getPaginatorClasses -------------------------------------------

const getPaginatorClasses = defineStyle(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    fontSize: theme.fonts.medium.fontSize,
    fontFamily: theme.fonts.medium.fontFamily,
    ...theme.fonts.medium
  },
  
  button: {
    border: 'none',
    margin: 0,
    padding: "4px 4px",
    boxSizing: 'border-box',
    background: 'none',
    outline: 'none',
    height: '26x',
    width: '28px',
    cursor: 'pointer',

    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: '0.7',
      },

      '&:hover:not(:disabled)': {
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: theme.semanticColors.buttonBackgroundHovered
      },

      '&:active:not(:disabled)': {
        backgroundColor: theme.semanticColors.buttonBackgroundChecked,
      },

      '& svg': {
        transform: 'translate(0px, 2px)'
      },

      '&::-moz-focus-inner': {
        border: 0
      }
    }
  },

  pageText1: {
    display: 'inline-block',
    marginLeft: '0.25rem',
  },

  pageText2: {
    display: 'inline-block',
    marginRight: '0.25rem',
  },

  textField: {
    width: '4rem',
    margin: '0 0.5rem',
    display: 'inline-block',

    selectors: {
      '& .ms-TextField-fieldGroup': {
        height: '1.75rem',
      },

      '& .ms-TextField-field': {
        padding: '0.25rem 0.5rem',
        ...theme.fonts.medium,
      }
    }
  }
}))

// --- exports -------------------------------------------------------

export default getPaginatorClasses
