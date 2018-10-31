
# The User Schema Schema


```
https://github.com/dcousino/Walcart/docs/user/user.schema.json
```





| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                           |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ------------------------------------ |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [user.schema.json](user.schema.json) |


# The User Schema Properties



| Property                                    | Type       | Required     | Default                                    | Defined by                    |
| ------------------------------------------- | ---------- | ------------ | ------------------------------------------ | ----------------------------- |
| [billingAddress](#billingaddress)           | `object`   | Optional     |                                            | The User Schema (this schema) |
| [currentOrder](#currentorder)               | `string`   | Optional     | `""`                                       | The User Schema (this schema) |
| [currentShoppingCart](#currentshoppingcart) | `string`   | Optional     | `""`                                       | The User Schema (this schema) |
| [deliveryAddress](#deliveryaddress)         | `object`   | Optional     |                                            | The User Schema (this schema) |
| [firstName](#firstname)                     | `string`   | **Required** | `""`                                       | The User Schema (this schema) |
| [id](#id)                                   | `string`   | **Required** | `""`                                       | The User Schema (this schema) |
| [lastName](#lastname)                       | `string`   | **Required** | `""`                                       | The User Schema (this schema) |
| [lastVisited](#lastvisited)                 | `integer`  | **Required** | `0`                                        | The User Schema (this schema) |
| [previousOrders](#previousorders)           | `string[]` | Optional     |                                            | The User Schema (this schema) |
| `*`                                         | any        | Additional   | this schema *allows* additional properties |

## billingAddress
### The Billingaddress Schema



`billingAddress`
* is optional
* type: `object`
* defined in this schema



### billingAddress Type




`object` with following properties:




| Property           | Type    | Required     | Default |
| ------------------ | ------- | ------------ | ------- |
| `addressLine1`     | string  | Optional     | `""`    |
| `addressLine2`     | string  | Optional     | `""`    |
| `addressLine3`     | string  | Optional     | `""`    |
| `isSameAsDelivery` | boolean | **Required** | `false` |
| `state`            | string  | Optional     | `""`    |
| `zip`              | string  | Optional     | `""`    |






#### addressLine1
##### The Addressline1 Schema


undefined


`addressLine1`
* is optional
* type: `string`
* default: `""`




##### addressLine1 Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [](https://regexr.com/?expression=%5E(.*)%24&text=)








##### addressLine1 Example


```json

```








#### addressLine2
##### The Addressline2 Schema


undefined


`addressLine2`
* is optional
* type: `string`
* default: `""`




##### addressLine2 Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [](https://regexr.com/?expression=%5E(.*)%24&text=)








##### addressLine2 Example


```json

```








#### addressLine3
##### The Addressline3 Schema


undefined


`addressLine3`
* is optional
* type: `string`
* default: `""`




##### addressLine3 Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [](https://regexr.com/?expression=%5E(.*)%24&text=)








##### addressLine3 Example


```json

```








#### isSameAsDelivery
##### The Issameasdelivery Schema


undefined


`isSameAsDelivery`
* is **required**
* type: `boolean`
* default: `false`




##### isSameAsDelivery Type




`boolean`







##### isSameAsDelivery Example


```json
true
```








#### state
##### The State Schema


undefined


`state`
* is optional
* type: `string`
* default: `""`




##### state Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [](https://regexr.com/?expression=%5E(.*)%24&text=)








##### state Example


```json

```








#### zip
##### The Zip Schema


undefined


`zip`
* is optional
* type: `string`
* default: `""`




##### zip Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [](https://regexr.com/?expression=%5E(.*)%24&text=)








##### zip Example


```json

```














## currentOrder
### The Currentorder Schema



`currentOrder`
* is optional
* type: `string`
* default: `""`

* defined in this schema



### currentOrder Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [901643c9-c3a4-4989-a9c3-e0876dacd6c3](https://regexr.com/?expression=%5E(.*)%24&text=901643c9-c3a4-4989-a9c3-e0876dacd6c3)








### currentOrder Example


```json
"901643c9-c3a4-4989-a9c3-e0876dacd6c3"
```




## currentShoppingCart
### The Currentshoppingcart Schema



`currentShoppingCart`
* is optional
* type: `string`
* default: `""`

* defined in this schema



### currentShoppingCart Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [7b137d27-8167-4a0c-bfb3-61ccf7edea5c](https://regexr.com/?expression=%5E(.*)%24&text=7b137d27-8167-4a0c-bfb3-61ccf7edea5c)








### currentShoppingCart Example


```json
"7b137d27-8167-4a0c-bfb3-61ccf7edea5c"
```




## deliveryAddress
### The Deliveryaddress Schema



`deliveryAddress`
* is optional
* type: `object`
* defined in this schema



### deliveryAddress Type




`object` with following properties:





| Property | Type | Required | Default |
| -------- | ---- | -------- | ------- |

| `addressLine1`| string | **Required** | `""` |

| `addressLine2`| string | **Required** | `""` |

| `addressLine3`| string | **Required** | `""` |

| `state`| string | **Required** | `""` |

| `zip`| string | **Required** | `""` |






#### addressLine1
##### The Addressline1 Schema


undefined


`addressLine1`
* is **required**
* type: `string`
* default: `""`




##### addressLine1 Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [123 Lollypop Ln](https://regexr.com/?expression=%5E(.*)%24&text=123%20Lollypop%20Ln)








##### addressLine1 Example


```json
123 Lollypop Ln
```








#### addressLine2
##### The Addressline2 Schema


undefined


`addressLine2`
* is **required**
* type: `string`
* default: `""`




##### addressLine2 Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [](https://regexr.com/?expression=%5E(.*)%24&text=)








##### addressLine2 Example


```json

```








#### addressLine3
##### The Addressline3 Schema


undefined


`addressLine3`
* is **required**
* type: `string`
* default: `""`




##### addressLine3 Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [](https://regexr.com/?expression=%5E(.*)%24&text=)








##### addressLine3 Example


```json

```








#### state
##### The State Schema


undefined


`state`
* is **required**
* type: `string`
* default: `""`




##### state Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [MD](https://regexr.com/?expression=%5E(.*)%24&text=MD)








##### state Example


```json
MD
```








#### zip
##### The Zip Schema


undefined


`zip`
* is **required**
* type: `string`
* default: `""`




##### zip Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [21085](https://regexr.com/?expression=%5E(.*)%24&text=21085)








##### zip Example


```json
21085
```














## firstName
### The Firstname Schema



`firstName`
* is **required**
* type: `string`
* default: `""`

* defined in this schema



### firstName Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [Daniel](https://regexr.com/?expression=%5E(.*)%24&text=Daniel)








### firstName Example


```json
"Daniel"
```




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


* test example: [dcousino@email.com](https://regexr.com/?expression=%5E(.*)%24&text=dcousino%40email.com)








### id Example


```json
"dcousino@email.com"
```




## lastName
### The Lastname Schema



`lastName`
* is **required**
* type: `string`
* default: `""`

* defined in this schema



### lastName Type




`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [Cousino](https://regexr.com/?expression=%5E(.*)%24&text=Cousino)








### lastName Example


```json
"Cousino"
```




## lastVisited
### The Lastvisited Schema



`lastVisited`
* is **required**
* type: `integer`
* default: `0`

* defined in this schema



### lastVisited Type




`integer`










### lastVisited Example


```json
1540393941
```




## previousOrders
### The Previousorders Schema



`previousOrders`
* is optional
* type: `string[]`


* defined in this schema



### previousOrders Type




Array type: `string[]`



All items must be of the type:

`string`




All instances must conform to this regular expression

```regex
^(.*)$
```


* test example: [26132d42-f224-4836-a49c-8348c2a4673d](https://regexr.com/?expression=%5E(.*)%24&text=26132d42-f224-4836-a49c-8348c2a4673d)
* test example: [d0c4826d-e953-431a-baec-ff4a4b8d94fc](https://regexr.com/?expression=%5E(.*)%24&text=d0c4826d-e953-431a-baec-ff4a4b8d94fc)














