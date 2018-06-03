import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginForm from '../main/api/components/LoginForm';
import ControlCenter from '../main/api/components/ControlCenter';
import { MuiThemeProvider } from '@material-ui/core';

const App = () => (
  <Fragment>
    <CssBaseline/>
    <MuiThemeProvider>
      <ControlCenter/>
    </MuiThemeProvider>
  </Fragment>
);

ReactDOM.render(<App/>, document.getElementById('main-content'));