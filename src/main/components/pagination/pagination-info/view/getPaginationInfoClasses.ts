// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getPaginationInfoClasses --------------------------------------

const getPaginationInfoClasses = defineStyle(theme => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- exports -------------------------------------------------------

export default getPaginationInfoClasses
