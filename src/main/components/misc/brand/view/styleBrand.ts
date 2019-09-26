// internal imports
import defineStyle2 from '../../../../styling/defineStyle2'

// --- styleBrand ---------------------------------------------------

const styleBrand = defineStyle2(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },

  themeColored: {
    color: theme.palette.themePrimary
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

  vendorSmall: {
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    padding: 0,
    margin: 0,
  },
  
  titleSmall: {
    fontSize: theme.fonts.mediumPlus.fontSize,
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    padding: 0,
    margin: '-3px 0 0 0',
    lineHeight: '1.25rem',
  },
  
  logoSmall: {
    width: '24px',
    height: '24px',
    padding: '5px 0 0 0',
  },

  vendorMedium: {
    fontSize: theme.fonts.medium.fontSize + ' !important',
    fontFamily: theme.fonts.medium.fontFamily,
    margin: '0 0 0 2px',
  },
  
  titleMedium: {
    fontSize: theme.fonts.large.fontSize + ' !important',
    fontFamily: theme.fonts.large.fontFamily,
    margin: '-3px 0 0 2px',
  },
  
  logoMedium: {
    width: '28px',
    height: '28px',
    padding: '7px 0 0 0', 
  },

  vendorLarge: {
    fontSize: theme.fonts.mediumPlus.fontSize + ' !important',
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    margin: '0 0 0 4px', 
  },
  
  titleLarge: {
    fontSize: theme.fonts.xLarge.fontSize + ' !important',
    fontFamily: theme.fonts.xLarge.fontFamily,
    margin: '-5px 0 0 4px', 
  },
  
  logoLarge: {
    width: '32px',
    height: '32px',
    padding: '10px 0 0 0',
  },

  vendorHuge: {
    fontSize: theme.fonts.large.fontSize + ' !important',
    fontFamily: theme.fonts.mediumPlus.fontFamily,
    margin: '0 0 0 4px',
  },

  titleHuge: {
    fontSize: theme.fonts.xxLarge.fontSize + ' !important',
    fontFamily: theme.fonts.xxLarge.fontFamily,
    margin: '-8px 0 0 4px', 
  },

  logoHuge: {
    width: '42px',
    height: '42px',
    padding: '4px 0 0 0',
  },
}))

// --- exports ------------------------------------------------------

export default styleBrand
