export default interface ActionEvent {
  type: 'action',
  kind: string,
  id: string | null
}
