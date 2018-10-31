
# The Cart Schema Schema


```
https://github.com/dcousino/Walcart/blob/master/docs/cart/cart.schema.json
```





| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                           |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ------------------------------------ |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [cart.schema.json](cart.schema.json) |


# The Cart Schema Properties



| Property        | Type       | Required     | Default                                    | Defined by                    |
| --------------- | ---------- | ------------ | ------------------------------------------ | ----------------------------- |
| [id](#id)       | `string`   | **Required** | `""`                                       | The Cart Schema (this schema) |
| [items](#items) | `object[]` | **Required** |                                            | The Cart Schema (this schema) |
| `*`             | any        | Additional   | this schema *allows* additional properties |


## id
### The Id Schema



`id`
* is **required**
* type: `string`
* default: `""`

* defined in this schema



### id Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [a4343bd3-a9db-4faa-9a05-f4779a99e11a](https://regexr.com/?expression=%5E(.*)%24&text=a4343bd3-a9db-4faa-9a05-f4779a99e11a)








### id Example


```json
"a4343bd3-a9db-4faa-9a05-f4779a99e11a"
```




## items
### The Items Schema



`items`
* is **required**
* type: `object[]`


* defined in this schema



### items Type




Array type: `object[]`



All items must be of the type:

`object` with following properties:





| Property      | Type    | Required     | Default |
| ------------- | ------- | ------------ | ------- |
| `category`    | string  | **Required** | `""`    |
| `productId`   | integer | **Required** | `0`     |
| `productName` | string  | **Required** | `""`    |
| `qty`         | integer | **Required** | `0`     |
| `salePrice`   | number  | **Required** | `0`     |
| `thumbnail`   | string  | **Required** | `""`    |






#### category
##### The Category Schema


undefined


`category`
* is **required**
* type: `string`
* default: `""`




##### category Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [Food/Meal Solutions, Grains &amp; Pasta/Pasta &amp; Noodles](https://regexr.com/?expression=%5E(.*)%24&text=Food%2FMeal%20Solutions%2C%20Grains%20%26%20Pasta%2FPasta%20%26%20Noodles)








##### category Example


```json
Food/Meal Solutions, Grains & Pasta/Pasta & Noodles
```








#### productId
##### The Productid Schema


undefined


`productId`
* is **required**
* type: `integer`
* default: `0`




##### productId Type




`integer`










##### productId Example


```json
718430110
```








#### productName
##### The Productname Schema


undefined


`productName`
* is **required**
* type: `string`
* default: `""`




##### productName Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [(6 Pack) Barilla Pasta Spaghetti, 16.0 oz](https://regexr.com/?expression=%5E(.*)%24&text=(6%20Pack)%20Barilla%20Pasta%20Spaghetti%2C%2016.0%20oz)








##### productName Example


```json
(6 Pack) Barilla Pasta Spaghetti, 16.0 oz
```








#### qty
##### The Qty Schema


undefined


`qty`
* is **required**
* type: `integer`
* default: `0`




##### qty Type




`integer`










##### qty Example


```json
4
```








#### salePrice
##### The Saleprice Schema


undefined


`salePrice`
* is **required**
* type: `number`
* default: `0`




##### salePrice Type




`number`










##### salePrice Example


```json
7.14
```








#### thumbnail
##### The Thumbnail Schema


undefined


`thumbnail`
* is **required**
* type: `string`
* default: `""`




##### thumbnail Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [https://i5.walmartimages.com/asr/20f02778-c6c8-4c96-8826-b8437259ea77_1.2a6b1afe39235c937ee9eb757a2cc06a.jpeg?odnHeight=100&amp;odnWidth=100&amp;odnBg=ffffff](https://regexr.com/?expression=%5E(.*)%24&text=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F20f02778-c6c8-4c96-8826-b8437259ea77_1.2a6b1afe39235c937ee9eb757a2cc06a.jpeg%3FodnHeight%3D100%26odnWidth%3D100%26odnBg%3Dffffff)








##### thumbnail Example


```json
https://i5.walmartimages.com/asr/20f02778-c6c8-4c96-8826-b8437259ea77_1.2a6b1afe39235c937ee9eb757a2cc06a.jpeg?odnHeight=100&odnWidth=100&odnBg=ffffff
```

















