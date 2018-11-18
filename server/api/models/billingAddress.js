const DeliveryAddress = require('./deliveryAddress');
class BillingAddress extends DeliveryAddress {
  constructor(params) {
    super(params);
    if (params) {
      this.isSameAsDelivery = params.isSameAsDelivery;
    } else {
      this.isSameAsDelivery = true;
    }
  }
}

module.exports = BillingAddress;
