// --- CheckGroupProps ----------------------------------------------

type CheckGroupProps = {
  name?: string
  label?: string,
  selectedKeys?: string[],
  orientation?: 'horizontal' | 'vertical',
  grow?: number,
  options: Option[]
}

// --- locals -------------------------------------------------------

type Option = {
  key: string,
  text: string
}

// --- exports ------------------------------------------------------

export default CheckGroupProps 
