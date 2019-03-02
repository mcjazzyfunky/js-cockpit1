// external imports
import { ITheme } from 'office-ui-fabric-react'
import Color from 'color'

// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleCockpit -------------------------------------------------

const styleCockpit = defineStyle((theme: ITheme) => {
  return {
    cockpit: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '100%',
      position: 'absolute',
      height: '100%',
      justifyContent: 'stretch',
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      height: '46px',
      minWidth: '100%',
      color: '#f0f0f0',
      backgroundColor: 'rgb(50,50,50)' 
    },

    headerStart: {
      padding: '0.1rem 0.5rem',
      whiteSpace: 'nowrap',
    },

    headerCenter: {
      flexGrow: 1,
      padding: '0 2rem 0.2rem 4rem',
      whiteSpace: 'nowrap',
    },

    headerEnd: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',

      selectors: {
        '& > *': {
          marginLeft: '0.9rem'
        }
      }
    },

    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
    },

    sideNav: {
      display: 'flex',

      selectors: {
        '> div': {
          flexGrow: 1
        }
      }
    },

    Center: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      
      selectors: {
        '> div': {
          flexGrow: 1
        }
      }
    },

    logoutButton: {
      color: theme.palette.white,
      backgroundColor: theme.palette.themePrimary,
      border: 'none',
      width: '46px',
      height: '46px',
      textAlign: 'center',
      verticalAlign: 'middle',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      //borderWidth: '0 0 0 0.5px',
      //borderStyle: 'solid',
      //borderColor: Color(theme.palette.themePrimary).lighten(0.5),
     
      selectors: {
        '&:hover': {
          backgroundColor: Color(theme.palette.themePrimary).darken(0.2)
        },
 
        '&:active': {
          backgroundColor: Color(theme.palette.themePrimary).darken(0.1)
        }
      }
    }
  }
})

// --- exports ------------------------------------------------------

export default styleCockpit
