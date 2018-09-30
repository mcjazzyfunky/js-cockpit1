import React from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec' // 3rd-party validation library
import { Brand, DataTable, LoginForm, LoginScreen, MenuBar } from '../main/js-cockpit'

const loginScreen = 
  <LoginScreen>
    <LoginScreen.Content>
      <LoginForm>
        <LoginForm.Header>
          <Brand vendor="meet+greet" title="Back Office - Login"/>
        </LoginForm.Header>
      </LoginForm>
    </LoginScreen.Content>
  </LoginScreen>

const dataTable =
  <DataTable
    data={[
      {
        firstName: 'Jane',
        lastName: 'Doe'
      },
      {
        firstName: 'John',
        lastName: 'Miller'
      }
    ]} 
  >
    <DataTable.Column
      title="Column1"
      field="firstName"
    />
    <DataTable.Column
      title="Column2"
      field="lastName"
    />
  </DataTable>

const menuBar =
  <MenuBar>
    <MenuBar.Menu text="Menu-1">
      <MenuBar.Item text="MenuItem-1-1"/>
      <MenuBar.Item text="MenuItem-1-2"/>
    </MenuBar.Menu>
    <MenuBar.Menu text="Menu-2">
      <MenuBar.Item text="MenuItem-2-1"/>
      <MenuBar.Item text="MenuItem-2-2"/>
    </MenuBar.Menu>
  </MenuBar>


const Demo = defineComponent({
  displayName: 'Demo',

  render() {
    return (
      menuBar
      /*
      <VBox style={{ width: '100%', height: '100%', border: '1px solid green' }}>
        <VBox.Cell>
          <HBox style={{ border: '1px solid red', width: '100%' }}>
            <HBox.Cell>
              Logo
            </HBox.Cell>
            <HBox.Cell grow={1}>
            x
            </HBox.Cell>
            <HBox.Cell>
              Avatar
            </HBox.Cell>
          </HBox>
        </VBox.Cell>
      </VBox>
    */
    )
  }
})

ReactDOM.render(<Demo/>, document.getElementById('main-content'))
