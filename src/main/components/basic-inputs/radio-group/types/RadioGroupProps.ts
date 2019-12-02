// --- RadioGroupProps -----------------------------------------------

type RadioGroupProps = {
  name?: string
  label?: string,
  defaultSelectedKey?: string,
  orientation?: 'horizontal' | 'vertical',
  grow?: number,
  options: Option[]
}

// --- locals --------------------------------------------------------

type Option = {
  key: string,
  text: string
}

// --- exports -------------------------------------------------------

export default RadioGroupProps 
