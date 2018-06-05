import React from 'react';
import ReactDOM from 'react-dom';
// import LoginForm from '../main/api/components/LoginForm';
import Logo from '../main/api/components/Logo';
import ControlCenter from '../main/api/components/ControlCenter';
import SideMenu from '../main/api/components/SideMenu';
import LogoIcon from '@material-ui/icons/CloudQueue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e88e5',
      contrastText: '#fff'
    }
  }
});


const App = () => (
  <MuiThemeProvider theme={theme}>
    <ControlCenter
      brand={
        <Logo

          icon={
            <LogoIcon style={{ transform: 'scale(1.25)' }}/>
          }

          vendor="meet+greet"
          title="Back Office"
        />
      }

      user={{
        name: 'Jane Doe'
      }}

      sidebar={
        <SideMenu
          menu={
            [
              {
                title: 'Global Configuration',

                items: [
                  {
                    title: 'User management',
                    items: [
                      {
                        id: 'back-office-users',
                        title: 'Back office users'
                      },
                      {
                        id: 'user-groups',
                        title: 'User Groups'
                      }
                    ]
                  },
                  {
                    title: 'Catalog',
                    items: [
                      {
                        id: 'product',
                        title: 'Products'
                      },
                      {
                        id: 'categories',
                        title: 'Categories'
                      }
                    ]
                  },
                  {
                    title: 'Content management',
                    
                    items: [
                      {
                        id: 'pages',
                        title: 'Pages'
                      },
                      {
                        id: 'menu',
                        title: 'Menu'
                      }
                    ]
                  }
                ]}
              ]
            }
        />  
      }
    />
  </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('main-content'));