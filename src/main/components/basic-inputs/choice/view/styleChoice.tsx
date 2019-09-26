// internal imports
import defineStyle2 from '../../../../styling/defineStyle2'

// --- styleChoice --------------------------------------------------

const styleChoice = defineStyle2(theme => ({
  container: {
  },

  label: {
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    margin: '0 0 1px 0',
  },
}))

// --- exports ------------------------------------------------------

export default styleChoice
