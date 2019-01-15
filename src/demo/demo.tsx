import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { initSystemIcons, AppsWithNav, ControlCenter } from '../main/js-cockpit'
import { loadTheme } from 'office-ui-fabric-react'
import LoginScreen from '../main/components/misc/internal/control-center/components/LoginScreen'
import LoginForm from '../main/components/misc/internal/control-center/components/LoginForm'
import Brand from '../main/components/misc/internal/control-center/components/Brand'
import Color from 'color'
import { FaHandshake } from 'react-icons/fa'

initSystemIcons()

const primaryColor = '#e6522c'

loadTheme({
  palette: {
    // 'themePrimary': primaryColor,
    // 'themeSecondary': Color(primaryColor).lighten(0.2).string(),
    // 'themeTertiary': Color(primaryColor).lighten(0.4).string(),
  }
})

function Demo() {
 const loginScreen =  
    <LoginScreen>
      <LoginScreen.Content>
        <LoginForm
          performLogin={
            (/* { username, password, remember } */) => // TODO
              Promise.resolve({ fullName: 'Jimmy Jumper' })
          }
        >
          <LoginForm.Header>
            <Brand vendor="meet+greet" title="Back Office - Login" size="large"/>
          </LoginForm.Header>
        </LoginForm>
      </LoginScreen.Content>
    </LoginScreen>

  const controlCenter =
    <ControlCenter vendor="meet+greet" title="Back Office">
      <ControlCenter.Apps>
        <ControlCenter.App id="admin" title="Administration" description="This is for adminstration purposes">
          <AdministrationApp/>
        </ControlCenter.App>
        <ControlCenter.App id="content" title="Content Management" description="This is the CMS">
        </ControlCenter.App>
        <ControlCenter.App id="content" title="ERP" description="Enterprise Resource Planning">
        </ControlCenter.App>
      </ControlCenter.Apps>
    </ControlCenter>

  return controlCenter 
}

const AdministrationApp = defineComponent({
  displayName: 'AdministrationApp',

  render() {
    return (
       <AppsWithNav selectedId='be-users'>
              <AppsWithNav.Apps>
                <AppsWithNav.AppGroup groupId="users" title="User Management">
                  <AppsWithNav.App id="be-users" title="Back office users">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="fe-users" title="Front end users">
                  </AppsWithNav.App>
                </AppsWithNav.AppGroup>
                <AppsWithNav.AppGroup groupId="catalog" title="Catalog data">
                  <AppsWithNav.App id="products" title="Products">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="variants" title="Variants">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="categories" title="Categories">
                  </AppsWithNav.App>
                </AppsWithNav.AppGroup>
                <AppsWithNav.AppGroup groupId="yyy" title="Media">
                  <AppsWithNav.App id="images" title="Images">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="videos" title="Videos">
                  </AppsWithNav.App>
                  <AppsWithNav.App id="presentations" title="Presentations">
                  </AppsWithNav.App>
                </AppsWithNav.AppGroup>
              </AppsWithNav.Apps>
            </AppsWithNav>
      )
  }
})

ReactDOM.render(<Demo/>, document.getElementById('main-content'))

