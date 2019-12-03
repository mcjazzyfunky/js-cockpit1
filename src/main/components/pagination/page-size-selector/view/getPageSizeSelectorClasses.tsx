// internal imports
import defineStyles from '../../../../styling/defineStyles'

// --- getPageSizeSelectorClasses ------------------------------------

const getPageSizeSelectorClasses = defineStyles(theme => {
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
