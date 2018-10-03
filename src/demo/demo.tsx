import React, { ReactNode } from 'react'
import { defineComponent } from 'js-react-utils'
import { initSystemIcons, AppsWithMenu, ControlCenter } from '../main/js-cockpit'

initSystemIcons()

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
        <AppsWithMenu.Menus>
          <AppsWithMenu.Menu name="userMgmt" title="User management">
            <AppsWithMenu.Item
              name="backendUsers"
              title="Backend Users"
            />
            <AppsWithMenu.Item
              name="frontendUsers"
              title="Frontend Users"
            />
          </AppsWithMenu.Menu>
          <AppsWithMenu.Menu name="fileMgmt" title="File management">
            <AppsWithMenu.Menu
              name="images"
              title="Images"
            >
              <AppsWithMenu.Item
                name="jpg"
                title="JPEG"
              />
              <AppsWithMenu.Item
                name="gif"
                title="GIF"
              />
              <AppsWithMenu.Item
                name="png"
                title="PNG"
              />
            </AppsWithMenu.Menu>
            <AppsWithMenu.Item
              name="videos"
              title="Videos"
            />
          </AppsWithMenu.Menu>
        </AppsWithMenu.Menus>
      </AppsWithMenu>
    )
  }
})
