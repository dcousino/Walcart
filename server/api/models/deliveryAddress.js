const isEmpty = require('../isEmpty');
const DBProperty = require('../models/db-properties');
const { REQUIRED } = require('../constants');
class DeliveryAddress {
  constructor(address) {
    if (isEmpty(address)) {
      this.addressLine1 = null;
      this.addressLine = null;
      this.addressLine3 = null;
      this.city = null;
      this.state = null;
    } else {
      this.addressLine1 = new DBProperty(
        address.addressLine1,
        'Address Line 1',
        null,
        REQUIRED
      ).value;
      this.addressLine2 = new DBProperty(
        address.addressLine2,
        'Address Line 2',
        null
      ).value;
      this.addressLine3 = new DBProperty(
        address.addressLine2,
        'Address Line 2',
        null
      ).value;
      this.zip = new DBProperty(address.zip, 'Zip Code', null, REQUIRED).value;
      this.city = new DBProperty(address.city, 'City', null, REQUIRED).value;
      this.state = new DBProperty(address.state, 'State', null, REQUIRED).value;
    }
  }
}

module.exports = DeliveryAddress;
