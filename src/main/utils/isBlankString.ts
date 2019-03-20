export default function isBlank(s: any) {
  return typeof s === 'string' && s.trim().length === 0
}
