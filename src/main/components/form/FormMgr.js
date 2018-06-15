import formMgrConfigSpec from './formMgrConfigSpec';

export default class FormMgr {
  constructor(config) {
    const error = validateFormMgrConfig(config);

    if (error) {
      throw new TypeError(
        '[FormMgr.constructor] Illegal first argument "config" => '
          + error.message);
    }

    this.fields = {};

    for (let i = 0; i < config.fields.length; ++i) {
      const
        fieldConfig = config.fields[i],
        fieldName = fieldConfig.name;
    
      this.fields[fieldName] = {
        errorMsg: null
      };
    }
  }

  validate() {
    this.fields.password.errorMsg = 'Dooh';
    console.log('validate')
  }

  getErrorMsgByField(name) {
    let ret = null;

    if (this.fields.hasOwnProperty(name)) {
      ret = this.fields[name].errorMsg;
    }
console.log(name, ret)
    return ret;
  }
}

// --- locals -------------------------------------------------------

function validateFormMgrConfig(config) {
  return formMgrConfigSpec.validate(config);
}