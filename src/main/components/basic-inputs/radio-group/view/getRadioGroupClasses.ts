// internal imports
import defineStyles from '../../../../styling/defineStyles'

// --- getRadioGroupClasses ------------------------------------------

const getRadioGroupClasses = defineStyles(theme => ({
  container: {
  },

  label: {
  },

  vertical: {
    selectors: {
      '& .ms-ChoiceField': {
        display: 'inline-block',
        marginRight: '1rem',
      }
    }
  }
}))

// --- exports -------------------------------------------------------

export default getRadioGroupClasses
