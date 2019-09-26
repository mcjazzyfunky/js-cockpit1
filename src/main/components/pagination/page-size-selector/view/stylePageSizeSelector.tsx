// external imports
import { ITheme } from 'office-ui-fabric-react'

// internal imports
import defineStyle2 from '../../../../styling/defineStyle2'

// --- stylePageSizeSelector ----------------------------------------

const stylePageSizeSelector = defineStyle2((theme: ITheme) => ({
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
