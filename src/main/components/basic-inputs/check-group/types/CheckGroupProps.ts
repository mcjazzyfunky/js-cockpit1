// --- CheckGroupProps ----------------------------------------------

type CheckGroupProps = {
  options: Option[]
  name?: string
  label?: string,
  selectedKeys?: string[],
  orientation?: 'horizontal' | 'vertical',
  grow?: number,
}

// --- locals -------------------------------------------------------

type Option = {
  key: string,
  text: string
}

// --- exports ------------------------------------------------------

export default CheckGroupProps 
