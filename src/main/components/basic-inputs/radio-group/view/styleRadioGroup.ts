// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleRadioGroup ----------------------------------------------

const styleRadioGroup = defineStyle(theme => ({
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

// --- exports ------------------------------------------------------

export default styleRadioGroup
