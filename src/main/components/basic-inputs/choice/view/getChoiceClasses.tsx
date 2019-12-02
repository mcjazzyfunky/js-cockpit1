// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getChoiceClasses ----------------------------------------------

const getChoiceClasses = defineStyle(theme => ({
  container: {
  },

  label: {
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    margin: '0 0 1px 0',
  },
}))

// --- exports -------------------------------------------------------

export default getChoiceClasses
