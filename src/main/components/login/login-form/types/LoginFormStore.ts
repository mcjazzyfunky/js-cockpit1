type LoginFormStore = {
  getValue(field: string): any
  setValue(field: string, value: any): void
  getErrorMsg(field: string): string | null
  getGeneralErrorMsg(): string | null,
  performLogin(login: (values: Record<string, any>) => any):void // TODO,
  isLoading(): boolean,
  isValidationActivated(): boolean
}

export default LoginFormStore
