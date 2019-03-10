// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleDataForm ------------------------------------------------

const styleDataForm = defineStyle(theme => ({
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


}))

// --- exports ------------------------------------------------------

export default styleDataForm
