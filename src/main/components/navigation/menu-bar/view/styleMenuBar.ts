// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleMenuBar -------------------------------------------------

const styleMenuBar = defineStyle(theme => ({
  container: {
    position: 'relative'
  },

  inner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    display: 'none', //  can be made visible for parent components via CSS
    position: 'absolute'
  },

  commandBar: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternaryAlt,
    flex: 1,
  },
}))

// --- exports ------------------------------------------------------

export default styleMenuBar
