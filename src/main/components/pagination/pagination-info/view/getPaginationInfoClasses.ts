// internal imports
import defineStyles from '../../../../styling/defineStyles'

// --- getPaginationInfoClasses --------------------------------------

const getPaginationInfoClasses = defineStyles(theme => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- exports -------------------------------------------------------

export default getPaginationInfoClasses
