// external imports
import { ITheme } from 'office-ui-fabric-react'

// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- stylePageSizeSelector ----------------------------------------

const stylePageSizeSelector = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  },

  pageSizeText: {
    marginRight: '0.75rem'
  }
}))

// --- exports ------------------------------------------------------

export default stylePageSizeSelector
