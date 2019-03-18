// internal imports
import FormCtrl from '../../../../contexts/form-ctx/types/FormCtrl'
import FormCtrlSubscriber from '../../../../contexts/form-ctx/types/FormCtrlSubscriber'
import FormCtrlUnsubscribe from '../../../../contexts/form-ctx/types/FormCtrlUnsubscribe'

// --- DataFormCtrl -------------------------------------------------

class DataFormCtrl implements FormCtrl {
  private _values: any = {}
  private _tempValues: any = {}
  private _errorMsgs: Record<string, string> = {}
  private _requiredFields: Set<string> = new Set()
  private _disabledFields: Set<string> = new Set()
  private _subscribers: Set<Function> = new Set() // TODO

  getValue(field: string): any {
    return this._values.hasOwnProperty(field)
      ? this._values[field]
      : undefined
  }

  setValue(field: string, value: any): void {
    this._values[field] = value
    delete this._tempValues[field]
    this._emitUpdate() 
  }

  getTempValue(field: string): any {
    let ret: any = undefined

    if (this._tempValues.hasOwnProperty(field)) {
      ret = this._tempValues[field]
    } else if (this._values.hasOwnProperty(field)) {
      ret = this._values[field]
    }

    return ret
  }

  setTempValue(field: string, value: any): void {
    this._tempValues[field] = value
    this._emitUpdate() 
  }
  
  getErrorMsg(field: string): string | undefined {
    let ret: string | undefined = undefined

    if (this._errorMsgs.hasOwnProperty(field)) {
      ret = this._errorMsgs[field]
    }

    return ret
  }
  
  setErrorMsg(field: string, errorMsg: string): void {
    this._errorMsgs[field] = errorMsg
    this._emitUpdate() 
  }

  clearErrorMsg(field: string, errorMsg: string): void {
    delete this._errorMsgs[field]
    this._emitUpdate() 
  }

  getRequired(field: string): boolean {
    return this._requiredFields.has(field)
  }

  setRequired(field: string, required: boolean): void {
    if (required) {
      this._requiredFields.add(field)
    } else {
      this._requiredFields.delete(field)
    }
    
    this._emitUpdate() 
  }

  getDisabled(field: string): boolean {
    return this._disabledFields.has(field)
  }

  setDisabled(field: string, disabled: boolean): void {
    if (disabled) {
      this._disabledFields.add(field)
    } else {
      this._disabledFields.delete(field)
    }
    
    this._emitUpdate() 
  }

  subscribe(subscriber: FormCtrlSubscriber): FormCtrlUnsubscribe {
    const callback = subscriber.bind(null)

    this._subscribers.add(callback)

    return () => {
      this._subscribers.delete(callback)
    }
  }

  _emitUpdate() {
    const
      values = this._values,
      tempValues = { ...values, ...this._tempValues }

    this._subscribers.forEach(callback => {
      callback(values, tempValues)
    })
  }
}

// --- exports ------------------------------------------------------

export default DataFormCtrl
