// internal imports
import FormCtrl from '../../../../contexts/form-ctx/types/FormCtrl'
import FormValues from '../../../../contexts/form-ctx/types/FormValues'
import FormCtrlSubscriber from '../../../../contexts/form-ctx/types/FormCtrlSubscriber'
import FormCtrlUnsubscribe from '../../../../contexts/form-ctx/types/FormCtrlUnsubscribe'

// --- DataFormCtrl -------------------------------------------------

class DataFormCtrl implements FormCtrl {
  private _values: any = {}
  private _tempValues: any = {}
  private _subscribers: Set<Function> = new Set() // TODO
  private _timeout: any = null

  getValue(name: string): any {
    return this._values.hasOwnProperty(name)
      ? this._values[name]
      : undefined
  }

  setValue(name: string, value: any, quiet: boolean = false): void {
    this._values[name] = value
    this._tempValues[name] = value

    if (!quiet) {
      this._emitUpdate() 
    }
  }

  getTempValue(name: string): any {
    let ret: any = undefined

    if (this._tempValues.hasOwnProperty(name)) {
      ret = this._tempValues[name]
    }

    return ret
  }

  setTempValue(name: string, value: any, quiet: boolean = false): void {
    this._tempValues[name] = value

    if (!quiet) {
      this._emitUpdate() 
    }
  }
 
  setValues(values: FormValues, quiet: boolean = false) {
    this._values = {...values}
    this._tempValues = {...values}

    if (!quiet) {
      this._emitUpdate()
    }
  }

  getValues() {
    return this._values
  }

  getTempValues() {
    return this._tempValues
  }

  subscribe(subscriber: FormCtrlSubscriber): FormCtrlUnsubscribe {
    const callback = subscriber.bind(null)

    this._subscribers.add(callback)

    return () => {
      this._subscribers.delete(callback)
    }
  }

  _emitUpdate() {
    if (!this._timeout) {
      this._timeout = setTimeout(() => {
        const
          values = this._values,
          tempValues = { ...values, ...this._tempValues }

        this._timeout = null

        this._subscribers.forEach(callback => {
          callback(values, tempValues)
        })
      }, 0)
    }
  }
}

// --- exports ------------------------------------------------------

export default DataFormCtrl
