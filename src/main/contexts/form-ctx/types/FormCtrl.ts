// internal imports
import FormCtrlSubscriber from './FormCtrlSubscriber'
import FormCtrlUnsubscribe from './FormCtrlUnsubscribe'

// --- FormCtrl -----------------------------------------------------

type FormCtrl = {
  getValue(field: string): any,
  setValue(field: string, value: any): void,
  getTempValue(field: string): any,
  setTempValue(field: string, value: any): void,
  getErrorMsg(field: string): string | undefined,
  setErrorMsg(field: string, errorMsg: string): void,
  clearErrorMsg(field: string, errorMsg: string): void,
  getRequired(field: string): boolean,
  setRequired(field: string, required: boolean): void,
  getDisabled(field: string): boolean,
  setDisabled(field: string, disabled: boolean): void,
  subscribe(subscriber: FormCtrlSubscriber): FormCtrlUnsubscribe
}

// --- exports ------------------------------------------------------

export default FormCtrl
