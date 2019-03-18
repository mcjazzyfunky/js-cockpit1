// internal imports

// --- TextInputProps -----------------------------------------------

type TextInputProps = {
  name?: string,
  label?: string,
  id?: string,
  value?: string,
  disabled?: boolean | ((data: FormValues) => boolean),
  errorMessage?: string,
  grow?: number
}

// --- exports ------------------------------------------------------

export default TextInputProps 
