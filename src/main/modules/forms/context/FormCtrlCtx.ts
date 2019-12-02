// external imports
import { context } from 'js-react-utils'
import { Spec } from 'js-spec'

// intrnal imports
import FormCtrl from '../types/FormCtrl'

// --- context -------------------------------------------------------

export default context<FormCtrl>({
  displayName: 'FormCtrlCtx',

  ...process.env.NODE_ENV !== 'development' as any
    ? null
    : { validate: Spec.lazy(() => validateFormCtrl) },
})

// --- validation ----------------------------------------------------

const validateFormCtrl = Spec.exact({
  // TODO
})
