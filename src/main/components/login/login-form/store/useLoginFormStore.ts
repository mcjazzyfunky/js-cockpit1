// external imports
import { prepareStore } from 'js-react-utils'

// --- useLoginFormStore --------------------------------------------

const useLoginFormStore = prepareStore(
 (state: LoginFormState, setState) => {
  return {
    getValue(field: string): any {
      return state.values[field]
    },
    
    setValue(field: string, value: any): void {
      // TODO!!!
      state.values[field] = value
      state.errorMsgs[field] = null
      state.generalErrorMsg = null
      state.validationActivated = false
    },

    getErrorMsg(field: string) {
      return state.errorMsgs[field] || null
    },

    getGeneralErrorMsg() {
      return state.generalErrorMsg
    },

    isValidationActivated() {
      return state.validationActivated
    },

    isLoading() {
      return state.loading
    },

    performLogin(todo: any) {
      let hasErrors = false

      for (let field in state.values) {
        if (state.values.hasOwnProperty(field)) {
          if (!state.values[field]) {
            hasErrors = true
          }
        }
      }

      if (hasErrors) {
        // TODO!!!!
        state.validationActivated = true
      } else {
        console.log('Loading data: ', state.values, state.errorMsgs)
      }
    }
  }
}, initState)

// --- locals -------------------------------------------------------

type LoginFormState = {
  loading: boolean,
  values: Record<string, any>,
  errorMsgs: Record<string, string | null>,
  generalErrorMsg: string | null
  validationActivated: boolean
}

function initState(initialValues: Record<string, any> = {}): LoginFormState {
  return {
    loading: false,
    values: initialValues,
    errorMsgs: {},
    generalErrorMsg: null,
    validationActivated: false
  }
}

// --- exports ------------------------------------------------------

export default useLoginFormStore
