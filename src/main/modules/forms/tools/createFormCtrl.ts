// internal imports
import FormCtrl from '../types/FormCtrl'


export default function createFormCtrl(): FormCtrl {
  const ret: FormCtrl = new BaseFormCtrl()

  return ret
}

class BaseFormCtrl {
}
