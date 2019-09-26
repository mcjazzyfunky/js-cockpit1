import { createTheme, loadTheme, ITheme } from 'office-ui-fabric-react'

const themes = {
  default: {
  },

  blue: {
    palette: {
      themePrimary: '#0078d4',
      themeLighterAlt: '#eff6fc',
      themeLighter: '#deecf9',
      themeLight: '#c7e0f4',
      themeTertiary: '#71afe5',
      themeSecondary: '#2b88d8',
      themeDarkAlt: '#106ebe',
      themeDark: '#005a9e',
      themeDarker: '#004578',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
    }
  },

  orange: {
    palette: {
      themePrimary: '#d75d30',
      themeLighterAlt: '#fdf8f5',
      themeLighter: '#f8e2d9',
      themeLight: '#f3c9ba',
      themeTertiary: '#e7977b',
      themeSecondary: '#db6d45',
      themeDarkAlt: '#c1532a',
      themeDark: '#a34624',
      themeDarker: '#78331a',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
    }
  },

  violet: {
    palette: {
      themePrimary: '#b14dc2',
      themeLighterAlt: '#fcf6fd',
      themeLighter: '#f2def5',
      themeLight: '#e6c2ed',
      themeTertiary: '#ce8cda',
      themeSecondary: '#b95fc9',
      themeDarkAlt: '#9f46ae',
      themeDark: '#863b93',
      themeDarker: '#632b6d',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
    }
  },

  green: {
    palette: {
      themePrimary: '#47b367',
      themeLighterAlt: '#f6fcf8',
      themeLighter: '#dbf3e2',
      themeLight: '#bee8cb',
      themeTertiary: '#86d19c',
      themeSecondary: '#59bc76',
      themeDarkAlt: '#40a15d',
      themeDark: '#36884f',
      themeDarker: '#28643a',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
    }
  },

  teal: {
    palette: {
      themePrimary: '#03a1a1',
      themeLighterAlt: '#f1fbfb',
      themeLighter: '#caf0f0',
      themeLight: '#a0e3e3',
      themeTertiary: '#52c6c6',
      themeSecondary: '#18acac',
      themeDarkAlt: '#039191',
      themeDark: '#027a7a',
      themeDarker: '#025a5a',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
    }
  }
}

type ThemeName = keyof typeof themes

function loadThemeByName(name: ThemeName, fontFamily?: string): void
function loadThemeByName(name: ThemeName, substituteFontFamily?: boolean): void
function loadThemeByName(name: ThemeName, fontFamilySubstitution: boolean | string | undefined): void {
  if (!themes[name]) {
    throw new TypeError('[loadThemeByName] Illegal first argument "name" - unkown theme')
  }

  const theme: ITheme = createTheme(themes[name])
  
  let fontFamily: string | null = null
  
  if (fontFamilySubstitution === true) {
    fontFamily = '"Segoe UI", "Liberation Sans", Lato, Roboto, Arial, Helvetica, sans-serif'
  } else if (typeof fontFamilySubstitution === 'string') {
    fontFamily = fontFamilySubstitution
  }

  if (fontFamily) {
    let fonts: any = theme.fonts

    Object.keys(fonts).forEach(fontSize => {
      fonts[fontSize].fontFamily = fontFamily 
    })
  }

  loadTheme(theme)
}

// --- exports ------------------------------------------------------

export default loadThemeByName
