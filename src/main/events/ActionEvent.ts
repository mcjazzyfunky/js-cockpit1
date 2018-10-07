export default interface ActionEvent<Value = any>  {
  type: 'action',
  name?: string | null,
  value?: Value
}
