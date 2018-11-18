const { AUTO, REQUIRED } = require('../constants');
const PropertyRequiredError = require('./property-required');
const isEmpty = require('../isEmpty');

class DBProperty {
  constructor(value, fieldName, defaultValue, propType) {
    if (propType === AUTO) {
      this.value = value;
    } else if (isEmpty(value)) {
      if (propType === REQUIRED) {
        throw new PropertyRequiredError(`${fieldName} is a required field`);
      } else {
        this.value = defaultValue;
      }
    } else {
      this.value = value;
    }
  }
}

module.exports = DBProperty;
