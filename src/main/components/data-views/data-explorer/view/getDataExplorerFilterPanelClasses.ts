// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- getDataExplorerFilterPanelClasses -----------------------------

const getDataExplorerFilterPanelClasses = defineStyle(() => {
  return {
    container: {
      margin: '10px',
    },

    labelCell: {
      padding: '2px 12px 2px 10px',
      whiteSpace: 'nowrap',
      textAlign: 'right',
    },

    fieldCell: {
      padding: '2px'
    }
  }
})

// --- exports -------------------------------------------------------

export default getDataExplorerFilterPanelClasses
