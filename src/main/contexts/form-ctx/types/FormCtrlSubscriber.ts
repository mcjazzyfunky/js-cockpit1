// internal inputs
import FormValues from './FormValues'

// --- FormCtrlSubscriber -------------------------------------------

type FormCtrlSubscriber =
  (values: FormValues, tempValues: FormValues) => void

// --- exports ------------------------------------------------------

export default FormCtrlSubscriber 
