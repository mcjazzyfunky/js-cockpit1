import React from 'react';
import { registerIcons } from '@uifabric/styling';

import Checkmark from 'svg-react-loader?name=Icon!../../../node_modules/material-design-icons/navigation/svg/production/ic_check_18px.svg';

export default function initSystem() {
  registerIcons({
    icons: {
      'calendar': <i className="material-icons" style={{ fontSize: '100%' }}>calendar_today</i>,
      //'up': <i className="fa fa-arrow-up"/>,
      //'down': <i className="fa fa-arrow-down"/>,
      'up': <i className="material-icons" style={{ fontSize: '100%' }}>arrow_upward</i>,
      'down': <i className="material-icons" style={{ fontSize: '100%' }}>arrow_downward</i>,
      'chevrondown': <i className="material-icons" style={{ fontSize: '1.8rem' }}>keyboard_arrow_down</i>,
      'chevronup': <i className="material-icons" style={{ fontSize: '100%' }}>keyboard_arrow_up</i>,
      'chevronleft': <i className="material-icons" style={{ fontSize: '100%' }}>keyboard_arrow_left</i>,
      'chevronright': <i className="material-icons" style={{ fontSize: '100%' }}>keyboard_arrow_right</i>,

      'checkmark': <i className="icon ion-md-checkmark"/>,
      //'checkmark': <Checkmark width={18} height={18} />,
      //'down': <i className="material-icons md-14" style={{ fontSize: 18 }}>arrow_downward</i>,
    }
  });
}
