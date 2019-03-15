// --- CheckGroupProps ----------------------------------------------

type CheckGroupProps = {
  name?: string
  label?: string,
  grow?: number,
  options?: Option[]
}

// --- locals -------------------------------------------------------

type Option = {
  key: string,
  text: string
}

// --- exports ------------------------------------------------------

export default CheckGroupProps 
