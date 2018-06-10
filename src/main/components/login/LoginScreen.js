import React from 'react';
import { defineComponent } from 'js-widgets';
import Color from 'color';

import LoginForm from './LoginForm';
import Css from '../styling/Css';

function getStyles({ theme }) {
  const
    gradientStartColor = Color(theme.palette.themePrimary).lighten(0.4).desaturate(0.3),
    gradientEndColor = Color(theme.palette.themePrimary).darken(0.4).desaturate(0.3);

  return {
    outerContainer: {
      position: 'absolute',
      display: 'block',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundImage: `linear-gradient(120deg, ${gradientStartColor}, ${gradientEndColor})`
    },

    innerContainer: {
      position: 'relative',
      display: 'inline-block',
      textAlign: 'center',
      verticalAlign: 'middle',
      left: '50%',
      right: '50%',
      top: '20%',
      bottom: '50%',
      transform: 'translate(-50%, -20%)'
    }
  };
}

export default defineComponent({
  displayName: 'LoginScreen',

  main() {
    return (
      <Css getStyles={getStyles}>
        {classes => 
          <div className={classes.outerContainer}>
            <div className={classes.innerContainer}>
              <LoginForm/>
            </div>
          </div>
        }
      </Css>
    );
  }
});
