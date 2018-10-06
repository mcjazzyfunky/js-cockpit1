import React, { ReactNode } from 'react'
import { defineComponent } from 'js-react-utils'
import { initSystemIcons, AppsWithMenu, ControlCenter } from '../main/js-cockpit'
import { loadTheme } from 'office-ui-fabric-react'
import Color from 'color'

initSystemIcons()

const primaryColor = '#e6522c'

loadTheme({
  palette: {
    'themePrimary': primaryColor,
    'themeSecondary': Color(primaryColor).lighten(0.2).string(),
    'themeTertiary': Color(primaryColor).lighten(0.4).string(),
  }
})

export default function Demo() {
  return (
    <ControlCenter vendor="meet+greet" title="Back Office">
      <ControlCenter.Apps>
        <ControlCenter.App name="admin" title="Administration">
          <AdministrationApp/>
        </ControlCenter.App>
      </ControlCenter.Apps>
    </ControlCenter>
  )
}

const AdministrationApp = defineComponent({
  displayName: 'AdministrationApp',

  render() {
    return (
      <AppsWithMenu>
        <AppsWithMenu.Apps>
          <AppsWithMenu.AppGroup name="userMgmt" title="User management">
            <AppsWithMenu.App
              name="backendUsers"
              title="Backend Users"
            />
            <AppsWithMenu.App
              name="frontendUsers"
              title="Frontend Users"
            />
          </AppsWithMenu.AppGroup>
          <AppsWithMenu.AppGroup name="fileMgmt" title="File management">
            <AppsWithMenu.AppGroup
              name="images"
              title="Images"
            >
              <AppsWithMenu.App
                name="jpg"
                title="JPEG"
              />
              <AppsWithMenu.App
                name="gif"
                title="GIF"
              />
              <AppsWithMenu.App
                name="png"
                title="PNG"
              />
            </AppsWithMenu.AppGroup>
            <AppsWithMenu.App
              name="videos"
              title="Videos"
            />
          </AppsWithMenu.AppGroup>
        </AppsWithMenu.Apps>
      </AppsWithMenu>
    )
  }
})
