// external imports
import { ITheme } from 'office-ui-fabric-react'

// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- stylePaginationInfo ------------------------------------------

const stylePaginationInfo = defineStyle((theme: ITheme) => ({
  container: {
    whiteSpace: 'nowrap',
    ...theme.fonts.medium
  }
}))

// --- exports ------------------------------------------------------

export default stylePaginationInfo
