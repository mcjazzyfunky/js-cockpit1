let counter = 0

export default function createUniqueId() {
  ++counter

  return `___id-${counter}___`
}
