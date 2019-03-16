// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleDataForm ------------------------------------------------

const styleDataForm = defineStyle(theme => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.white,
    width: '100%',
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
    borderColor: theme.palette.neutralLight,
    width: '100%',
  },

  headerStart: {
    marginRight: '30px',
  },

  headerCenter: {
    flexGrow: 1
  },

  headerEnd: {
  },

  title: {
    display: 'inline-block',
    color: theme.palette.neutralPrimary,
    fontSize: theme.fonts.large.fontSize,
    fontFamily: theme.fonts.large.fontFamily,
    margin: '0 6px 3px 6px',
    whiteSpace: 'nowrap',
  },
  
  actionBar: {
    display: 'inline-flex',
    marginBottom: '2px',

    selectors: {
      '& .ms-CommandBar': {
        backgroundColor: 'transparent !important',
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
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    //color: theme.palette.black,
    margin: '2px 5px 0 0',
  },
  
  actionIconDisabled: {
    color: theme.palette.neutralTertiary,
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    margin: '2px 5px 0 0',
  },

  actionButtonSeparator: {
    height: '10px',
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',
    borderColor: '#aaa',
    margin: '17px 3px 0 3px'
  },

  closeButton: {
    color: theme.palette.themeSecondary,
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0 !important',
    minWidth: 'auto',
    marginRight: '0.5rem',

    selectors: {
      '&:hover': {
        color: theme.palette.themeSecondary,
      },

      '&:active': {
        color: theme.palette.themeSecondary,
      }
    }
  },

  closeIcon: {
    width: '24px',
    height: '24px',
  },

  content: {
    overflow: 'auto',
    width: '100%',
    flexGrow: 1,
  }
}))

// --- exports ------------------------------------------------------

export default styleDataForm
