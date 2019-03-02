// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleBrand ---------------------------------------------------

const styleBrand = defineStyle(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },

  firstColumn: {
    justify: 'stretch',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 7px',
  },

  vendor: {
    fontSize: theme.fonts.smallPlus.fontSize,
    padding: 0,
    margin: 0,
  },

  vendorLarge: {
    fontSize: theme.fonts.medium.fontSize + ' !important',
    margin: '0 0 0 2px',
  },
  
  vendorHuge: {
    fontSize: theme.fonts.mediumPlus.fontSize + ' !important',
    margin: '0 0 0 8px', 
  },

  title: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    padding: 0,
    margin: '-3px 0 0 0',
    lineHeight: '1.25rem',
  },

  titleLarge: {
    fontSize: theme.fonts.large.fontSize + ' !important',
    margin: '-3px 0 0 2px',
  },
  
  titleHuge: {
    fontSize: theme.fonts.xLarge.fontSize + ' !important',
    margin: '-1px 0 0 8px', 
  },

  logo: {
    width: '24px',
    height: '24px',
    padding: '1px 0 0 0',
  },

  logoLarge: {
    width: '28px',
    height: '28px',
    padding: 0
  },

  logoHuge: {
    width: '32px',
    height: '32px',
    padding: 0
  },
}))

// --- exports ------------------------------------------------------

export default styleBrand
