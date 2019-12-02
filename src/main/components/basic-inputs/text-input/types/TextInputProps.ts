// internal imports
import FormValues from '../../../../contexts/form-ctx/types/FormValues'

// --- TextInputProps ------------------------------------------------

type TextInputProps = {
  name?: string,
  label?: string,
  id?: string,
  value?: string,
  disabled?: boolean | ((data: FormValues, tempData: FormValues) => boolean),
  errorMessage?: string,
  grow?: number
}

// --- exports -------------------------------------------------------

export default TextInputProps 
