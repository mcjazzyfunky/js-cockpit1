// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getLoginFormClasses ------------------------------------------

const getLoginFormClasses = defineStyle((
  theme,
  hasIntro: boolean,
  hasHeader: boolean,
  hasExtraFields: boolean,
  isFullSize: boolean
) => {
  const
    root = !isFullSize
      ? {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          userSelect: 'none',
        }
      : {
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

    headerBorder = !hasIntro
      ? {
          borderWidth: '0 0 0.5px 0',
          borderStyle: 'dashed',
          borderColor: theme.palette.themeTertiary
        }
      : {},

    header = !hasHeader
      ? {
          ...headerBorder,
          padding: '0.5rem 1.5rem 1rem 1.5rem',
          justifyContent: 'center',
          display: 'flex',
        }
      : {
          ...headerBorder,
          padding: '0.75rem 1.5rem 0.5rem 1.5rem',
          textAlign: 'center',
          fontSize: theme.fonts.xLarge.fontSize,
          fontFamily: theme.fonts.xLarge.fontFamily,
          color: theme.palette.themePrimary,
        },
    
    fields = !hasExtraFields
      ? {
           display: 'block',

           selectors: {
             '& > div': {
               display: 'block',
               minHeight: '84px'
             }
           }
        }
      : {
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

    errorMessage = !hasExtraFields
      ? {
          minHeight: '20px',
          color: theme.semanticColors.errorText,
        }
      : {
          margin: !hasExtraFields ? '0' : '1.5rem 0 0 0',
          color: theme.semanticColors.errorText,
      }

  return {
    root,
  
    inner: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '10px 0 0 0',
    },

    formColumn: {
      minWidth: '350px',
      flexDirection: 'column',
      minHeight: '130px',
      textAlign: 'left',
    },

    introColumn: {
      borderWidth: '0 1px 0 0',
      borderStyle: 'dashed',
      borderColor: theme.palette.themePrimary,
      margin: '0 24px 0 0',
      maxWidth: '300px'
    },

    intro: {
      margin: '0 20px 0 0',
      padding: '1rem 2rem',
    },

    header,

    form: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      paddingTop: '10px',
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

    rememberLogin: {
      margin: '1.25rem 0 0 0',
    },

    errorMessage,

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

    fields,


    footer: {
      fontSize: theme.fonts.mediumPlus.fontSize,
      fontFamily: theme.fonts.mediumPlus.fontFamily,
      color: theme.palette.neutralSecondaryAlt,
      padding: '0.5rem 0 0.75rem 0',
      textAlign: 'center',
    },

    spinner: {
      margin: '0 0 0 10px',
    },
  }
})

// --- exports ------------------------------------------------------

export default getLoginFormClasses
