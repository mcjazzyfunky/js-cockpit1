// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getRadioGroupClasses ------------------------------------------

const getRadioGroupClasses = defineStyle(theme => ({
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
