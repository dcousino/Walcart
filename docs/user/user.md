# User

> The user's id will be their email ...this will help will authentication and ensuring that a person with the same email can't register twice, also it's a shopping app ...they don't need a username

---

The basic object should look something like:

```javascript
{
  id: "dcousino@email.com",
  lastVisited: 1540393941,
  currentShoppingCart: "7b137d27-8167-4a0c-bfb3-61ccf7edea5c",
  lastName: "Cousino",
  firstName: "Daniel",
  currentOrder: "901643c9-c3a4-4989-a9c3-e0876dacd6c3",
  previousOrders: [
    "26132d42-f224-4836-a49c-8348c2a4673d",
    "d0c4826d-e953-431a-baec-ff4a4b8d94fc"
  ],
  deliveryAddress: {
      addressLine1: "123 Lollypop Ln",
      addressLine2: "",
      addressLine3: "",
      state: "MD",
      zip: "21085"
  },
  billingAddress: {
      isSameAsDelivery: true,
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      state: "",
      zip: ""
  }
}
```

[See Schema](https://github.com/dcousino/Walcart/docs/user/user.schema.md)
