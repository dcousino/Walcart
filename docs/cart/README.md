# Cart

---

The basic object should look something like:

```javascript
const cart = {
  id: 'a4343bd3-a9db-4faa-9a05-f4779a99e11a',
  items: [
    {
      productId: 718430110,
      productName: '(6 Pack) Barilla Pasta Spaghetti, 16.0 oz',
      category: 'Food/Meal Solutions, Grains & Pasta/Pasta & Noodles',
      thumbnail:
        'https://i5.walmartimages.com/asr/20f02778-c6c8-4c96-8826-b8437259ea77_1.2a6b1afe39235c937ee9eb757a2cc06a.jpeg?odnHeight=100&odnWidth=100&odnBg=ffffff',
      salePrice: 7.14,
      qty: 4
    },
    {
      productId: 47234309,
      productName: '(6 Pack) Del Monte Harvest Selects Peas & Carrots, 8.5 Oz',
      category:
        'Food/Meal Solutions, Grains & Pasta/Canned Goods/Canned Vegetables',
      thumbnail:
        'https://i5.walmartimages.com/asr/5dddc2bc-7541-450b-a7d0-4f53d3b6bdb5_1.068d72e40f18aeb297b17b27e30b9d00.jpeg?odnHeight=100&odnWidth=100&odnBg=ffffff',
      salePrice: 5.28,
      qty: 1
    }
  ]
};
```

[See Schema](https://github.com/dcousino/Walcart/blob/master/docs/cart/cart.schema.md)
