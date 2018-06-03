import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
// import LoginForm from '../main/api/components/LoginForm';
import Logo from '../main/api/components/Logo';
import ControlCenter from '../main/api/components/ControlCenter';
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
    <CssBaseline/>
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
    />
  </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('main-content'));