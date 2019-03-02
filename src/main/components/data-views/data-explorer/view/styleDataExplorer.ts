// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleDataExplorer -------------------------------------------

const styleDataExplorer = defineStyle(theme => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.palette.white,
    height: '100%',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    padding: '2px 0 2px 10px',
    height: '42px',
    boxSizing: 'border-box',
    margin: '0 0 4px 0',
    zIndex: 1,
    color: theme.palette.black,
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralLight
  },

  headerStart: {
    marginRight: '30px',
  },

  headerCenter: {
    flexGrow: 1
  },

  headerEnd: {
  },

  content: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    padding: '0 0 1px 0',
    overflow: 'auto',
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 0,
    padding: '4px 5px 1px 5px',
    borderWidth: '0.5px 0 0 0',
    borderColor: theme.palette.neutralTertiaryAlt,
    borderStyle: 'solid',
  },

  footerStart: {
  },

  footerCenter: {
    flexGrow: 1,
    padding: '0 3rem',
  },

  footerEnd: {
  },

  title: {
    display: 'inline-block',
    fontSize: theme.fonts.large.fontSize,
    margin: '0 6px 3px 6px',
    whiteSpace: 'nowrap',
  },

  actionBar: {
    display: 'inline-flex',

    selectors: {
      '& .ms-CommandBar': {
        backgroundColor: 'transparent !important'
      }
    }
  },
  
  actionButton: {
    color: theme.palette.black,
    backgroundColor: 'transparent',
    margin: '1px 0 0 4px',

    selectors: {
      ':hover': {
        backgroundColor: theme.palette.neutralLight,
      },
  
      ':active': {
        backgroundColor: theme.palette.neutralQuaternary
      },
    }
  },

  actionButtonDisabled: {
    color: theme.palette.neutralTertiary,
  },

  actionIcon: {
    color: theme.palette.themePrimary,
    fontSize: theme.fonts.mediumPlus.fontSize,
    //color: theme.palette.black,
    margin: '2px 5px 0 0',
  },
  
  actionIconDisabled: {
    color: theme.palette.neutralTertiary,
    fontSize: theme.fonts.mediumPlus.fontSize,
    margin: '2px 5px 0 0',
  },

  actionButtonSeparator: {
    height: '10px',
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
    borderColor: '#aaa',
    margin: '17px 3px 0 3px'
  },

  loadingPanel: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: '10000',
    backgroundColor: 'rgba(63, 63, 63, 0.08)',
    borderRadius: '2px',
  },

  loadingSpinner: {
    selectors: {
      '.ms-Spinner-circle': {
        borderColor: 
          theme.palette.neutralLight
            + ' ' + theme.palette.neutralLight
            + ' ' + theme.palette.neutralLight
            + ' transparent !important'
      }
    }
  },

  loadingPanelContent: {
    backgroundColor: theme.palette.neutralSecondary,
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 18px',

    selectors: {
      '& *': {
        color: 'white !important',
        fontSize: theme.fonts.medium.fontSize
      }
    }
  }
}))

// --- exports ------------------------------------------------------

export default styleDataExplorer
