// --- ChoiceProps --------------------------------------------------

type ChoiceProps = {
  name?: string
  label?: string,
  id?: string,
  grow?: number,
  options?: Option[]
}

// --- locals -------------------------------------------------------

type Option = {
  key: string,
  text: string
}

// --- exports ------------------------------------------------------

export default ChoiceProps 
