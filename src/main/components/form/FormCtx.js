import { defineContext } from 'js-scenery/react';

import FormMgr from './FormMgr';

export default defineContext({
  displayName: 'FormCtx',
  type: FormMgr
});
