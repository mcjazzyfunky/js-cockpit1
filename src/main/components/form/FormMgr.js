import formMgrConfigSpec from './formMgrConfigSpec';

export default class FormMgr {
  constructor(config, onValidation = null) {
    const error = validateFormMgrConfig(config);

    if (error) {
      throw new TypeError(
        '[FormMgr.constructor] Illegal first argument "config" => '
          + error.message);
    }

    this.__onValidation = onValidation;
    this.__fields = {};

    for (let i = 0; i < config.fields.length; ++i) {
      const
        fieldConfig = config.fields[i],
        fieldName = fieldConfig.name;
    
      this.__fields[fieldName] = {
        touched: false,
        supressValidation: false,
        rules: fieldConfig.rules,
        message: null
      };
    }
  }

  validate(onlyTouchedFields = false) {
    const fieldNames = Object.keys(this.__fields);

    for (let i = 0; i < fieldNames.length; ++i) {
      const
        fieldName = fieldNames[i],
        field = this.__fields[fieldName],
        rules = field.rules;

      if (field.suppressValidation) {
        field.message = null;
      } else if (!onlyTouchedFields || field.touched) {
        for (let i = 0; i < rules.length; ++i) {
          const rule = rules[i];

          if (rule.condition(field.value)) {
            field.message = null;
          } else {
            field.message = rule.errorMsg;
            break;
          }
        }
      }
    }

    if (this.__onValidation) {
      this.__onValidation();
    }
  }

  markTouchedByField(name) {
    if (this.__fields.hasOwnProperty(name)) {
      this.__fields[name].touched = true;
    }
  }

  setValueByField(name, value) {
    if (this.__fields.hasOwnProperty(name)) {
      this.__fields[name].value = value;
      this.__fields[name].message = null;
      this.validate(true);
    }
  }

  setSuppressValidationByField(name, value) {
    if (this.__fields.hasOwnProperty(name)) {
      this.__fields[name].suppressValidation = !!value;
    }
  }

  getMessageByField(name) {
    let ret = null;

    if (this.__fields.hasOwnProperty(name) && !this.__fields[name].dirty) {
      ret = this.__fields[name].message;
    }

    return ret;
  }
}

// --- locals -------------------------------------------------------

function validateFormMgrConfig(config) {
  return formMgrConfigSpec.validate(config);
}