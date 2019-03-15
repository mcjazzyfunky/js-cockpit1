// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleTextInput -----------------------------------------------

const styleTextInput = defineStyle(theme => ({
  container: {
    margin: '0.5rem 0 0.5rem 0',
  },

  label: {
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    margin: '0 0 1px 0',
  },
}))

// --- exports ------------------------------------------------------

export default styleTextInput