// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleMenuBar -------------------------------------------------

const styleMenuBar = defineStyle(theme => ({
  container: {
  },

  commandBar: {
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralQuaternaryAlt,
  },
}))

// --- exports ------------------------------------------------------

export default styleMenuBar
