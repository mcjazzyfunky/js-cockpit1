import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { initSystemIcons, Brand, AppSelector, HBox, SideNav, LoginForm, ControlCenter, UserMenu } from '../main/js-cockpit'
import { loadTheme } from 'office-ui-fabric-react'


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
  const loginForm =
    <LoginForm fullSize={true}>
      <LoginForm.Header>
        <Brand
          vendor="meet+greet"
          title="Back office - Login"
          size="large"
        />
      </LoginForm.Header>
    </LoginForm>

  const controlCenter =
    <ControlCenter onLogout={() => alert('Juhu')}>
      <ControlCenter.Brand>
        <Brand
          vendor="meet+greet"
          title="Back Office"
        />
      </ControlCenter.Brand>
      <ControlCenter.TopNav>
        <AppSelector apps={[
          {
            id: 'cms',
            title: 'Content management',
            description: 'Some description for the CMS'
          },
          {
            id: 'mms',
            title: 'Media management',
            description: 'Some description for the MMS'
          }
        ]}/>
      </ControlCenter.TopNav>
      <ControlCenter.UserNav>
        <UserMenu
          fullName="Jane Doe"
        />
      </ControlCenter.UserNav>
      <ControlCenter.SideNav>
        <SideNav>
            <SideNav.Item
              id="users"
              title="Users"
            />
            <SideNav.Item
              id="user-groups"
              title="User groups"
            />
        </SideNav>
      </ControlCenter.SideNav>
      <ControlCenter.MainContent>
        MainContent
      </ControlCenter.MainContent>
    </ControlCenter>

  return controlCenter
}

/*
function Demo() {
 const loginScreen =  
    <LoginScreen>
      <LoginScreen.Content>
        <LoginForm
          performLogin={
            () => // TODO
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
  displayName: 'Administratio.Item',

  render() {
    return (
       <SideNav activeItemId='be-users'>
                <SideNav.ItemGroup groupId="users" title="User Management">
                  <SideNav.Item id="be-users" title="Back office users">
                  </SideNav.Item>
                  <SideNav.Item id="fe-users" title="Front end users">
                  </SideNav.Item>
                </SideNav.ItemGroup>
                <SideNav.ItemGroup groupId="catalog" title="Catalog data">
                  <SideNav.Item id="products" title="Products">
                  </SideNav.Item>
                  <SideNav.Item id="variants" title="Variants">
                  </SideNav.Item>
                  <SideNav.Item id="categories" title="Categories">
                  </SideNav.Item>
                </SideNav.ItemGroup>
                <SideNav.ItemGroup groupId="yyy" title="Media">
                  <SideNav.Item id="images" title="Images">
                  </SideNav.Item>
                  <SideNav.Item id="videos" title="Videos">
                  </SideNav.Item>
                  <SideNav.Item id="presentations" title="Presentations">
                  </SideNav.Item>
                </SideNav.ItemGroup>
            </SideNav>
      )
  }
})
*/

ReactDOM.render(<Demo/>, document.getElementById('main-content'))

