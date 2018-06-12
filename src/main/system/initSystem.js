import React from 'react';
import { registerIcons } from '@uifabric/styling';

export default function initSystem() {
  registerIcons({
    icons: {
      'add': <i className="icon ion-md-add"/>,
      'calendar': <i className="icon ion-ios-calendar" style={{ fontSize: '115%' }}/>,
      'up': <i className="icon ion-md-arrow-up" style={{ fontSize: '100%' }}/>,
      'delete': <i className="icon ion-ios-trash" style={{ fontSize: '100%' }}/>,
      'down': <i className="icon ion-md-arrow-down" style={{ fontSize: '100%' }}/>,
      'download': <i className="icon ion-md-download" style={{ fontSize: '100%' }}/>,
      'chevrondown': <i className="ion-ios-arrow-down" style={{ fontSize: '125%' }}/>,
      'chevronup': <i className="icon ion-ios-arrow-up" style={{ fontSize: '125%' }}/>,
      'chevronleft': <i className="icon ion-ios-arrow-back" style={{ fontSize: '125%' }}/>,
      'chevronright': <i className="icon ion-ios-arrow-forward" style={{ fontSize: '125%' }}/>,
      'checkmark': <i className="icon ion-md-checkmark"/>,
      'remove': <i className="icon ion-md-remove"/>,
    }
  });
}
