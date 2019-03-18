// internal imports
import FormCtrlSubscriber from './FormCtrlSubscriber'
import FormCtrlUnsubscribe from './FormCtrlUnsubscribe'

// --- FormCtrl -----------------------------------------------------

type FormCtrl = {
  getValue(name: string): any,
  setValue(name: string, value: any): void,
  setValues(values: FormValues): void,
  getValues(): FormValues, 
  getTempValue(name: string): any,
  setTempValue(name: string, value: any): void,
  subscribe(subscriber: FormCtrlSubscriber): FormCtrlUnsubscribe
}

// --- exports ------------------------------------------------------

export default FormCtrl
