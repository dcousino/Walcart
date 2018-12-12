export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  deliveryAddress?: Address;
  billingAddress?: Address;
}

export interface DeliveryAddress {
  type: 'DeliveryAddress';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  deliverToFirstName: string;
  deliverToLastName: string;
}
export interface BillingAddress {
  type: 'BillingAddress';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  deliverToFirstName: string;
  deliverToLastName: string;
  isSameAsDeliveryAddress: boolean;
}

export type Address = DeliveryAddress | BillingAddress;
