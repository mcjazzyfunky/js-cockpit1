// external imports
import { ITheme } from 'office-ui-fabric-react'

// internal imports
import defineStyle2 from '../../../../styling/defineStyle2'

// --- stylePaginationInfo ------------------------------------------

const stylePaginationInfo = defineStyle2((theme: ITheme) => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- exports ------------------------------------------------------

export default stylePaginationInfo
