// internal imports
import FormCtrl from '../../../../contexts/form-ctx/types/FormCtrl'
import FormCtrlSubscriber from '../../../../contexts/form-ctx/types/FormCtrlSubscriber'
import FormCtrlUnsubscribe from '../../../../contexts/form-ctx/types/FormCtrlUnsubscribe'

// --- DataFormCtrl -------------------------------------------------

class DataFormCtrl implements FormCtrl {
  private _values: any = {}
  private _tempValues: any = {}
  private _subscribers: Set<Function> = new Set() // TODO

  getValue(name: string): any {
    return this._values.hasOwnProperty(name)
      ? this._values[name]
      : undefined
  }

  setValue(name: string, value: any): void {
    this._values[name] = value
    this._tempValues[name] = value
    this._emitUpdate() 
  }

  getTempValue(name: string): any {
    let ret: any = undefined

    if (this._tempValues.hasOwnProperty(name)) {
      ret = this._tempValues[name]
    }

    return ret
  }

  setTempValue(name: string, value: any): void {
    this._tempValues[name] = value
    this._emitUpdate() 
  }
 
  setValues(values: Record<string, any>) {
    this._values = {...values}
    this._tempValues = {...values}
    this._emitUpdate()
  }

  getValues() {
    return this._values
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
