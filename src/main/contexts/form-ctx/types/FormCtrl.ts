// internal imports
import FormValues from './FormValues'
import FormCtrlSubscriber from './FormCtrlSubscriber'
import FormCtrlUnsubscribe from './FormCtrlUnsubscribe'

// --- FormCtrl ------------------------------------------------------

type FormCtrl = {
  getValue(name: string): any,
  setValue(name: string, value: any, quiet?: boolean): void,
  setValues(values: FormValues, quiet?: boolean): void,
  getValues(): FormValues, 
  getTempValue(name: string): any,
  setTempValue(name: string, value: any, quiet?: boolean): void,
  getTempValues(): FormValues, 
  subscribe(subscriber: FormCtrlSubscriber): FormCtrlUnsubscribe
}

// --- exports -------------------------------------------------------

export default FormCtrl
