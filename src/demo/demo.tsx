import React from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec' // 3rd-party validation library
import { LoginForm, LoginScreen, Brand } from '../main/js-cockpit'

const Demo = defineComponent({
  displayName: 'Demo',

  render() {
    return (
      <LoginScreen>
        <LoginScreen.Content>
          <LoginForm>
            <LoginForm.Header>
              <Brand vendor="meet+greet" title="Back Office - Login" bicolor={true}/>
            </LoginForm.Header>
          </LoginForm>
        </LoginScreen.Content>
      </LoginScreen>
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
