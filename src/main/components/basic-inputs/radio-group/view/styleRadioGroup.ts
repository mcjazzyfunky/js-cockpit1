// internal imports
import defineStyle2 from '../../../../styling/defineStyle2'

// --- styleRadioGroup ----------------------------------------------

const styleRadioGroup = defineStyle2(theme => ({
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
