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
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      height: '46px',
      minWidth: '100%',
      color: '#f0f0f0',
      backgroundColor: 'rgb(50,50,50)',
      zIndex: 32000
    },

    headerStart: {
      padding: '0.1rem 0.5rem',
      whiteSpace: 'nowrap',
    },

    headerCenter: {
      flexGrow: 1,
      padding: '0 2rem 0.2rem 4rem',
      whiteSpace: 'nowrap',

      selectors: {
        '& [data-component=AppSelector] [data-component="AppSelector:inner"]': {
          paddingTop: '5px',
        },
  
        '& [data-component=AppSelector] .ms-Pivot-text': {
          color: theme.palette.white,
        },

        '& [data-component=MenuBar] [data-component="MenuBar:icon"]': {
          display: 'block !important',
        },
        
        '& [data-component=MenuBar] [data-component="MenuBar:icon"] *': {
          color: theme.palette.themeSecondary + ' !important',
        },

        '& [data-component=MenuBar] *': {
           color: theme.palette.white,
           backgroundColor: 'transparent !important',
           borderStyle: 'hidden !important',
        }
      }
    },

    headerEnd: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',

      selectors: {
        '& > div': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },

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

    center: {
      position: 'relative',
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

  }
})

// --- exports ------------------------------------------------------

export default styleCockpit
