// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getPageSizeSelectorClasses ------------------------------------

const getPageSizeSelectorClasses = defineStyle(theme => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      ...theme.fonts.medium
    },

    pageSizeText: {
      marginRight: '0.75rem'
    }
  }
})

// --- exports -------------------------------------------------------

export default getPageSizeSelectorClasses
