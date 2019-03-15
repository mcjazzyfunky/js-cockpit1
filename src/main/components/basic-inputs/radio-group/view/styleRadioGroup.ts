// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleRadioGroup ----------------------------------------------

const styleRadioGroup = defineStyle(theme => ({
  container: {
    margin: '0.5rem 0 0.5rem 0',
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
