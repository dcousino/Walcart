/*global require, module*/
const ApiBuilder = require('claudia-api-builder');
const axios = require('axios');
const { URL } = require('url');
const AWS = require('aws-sdk');
const api = new ApiBuilder();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const DBProperty = require('./models/db-properties');
const DynamoParams = require('./DynamoParams');
const NotFoundError = require('./NotFoundError');
const crypto = require('crypto');
const { AUTO, REQUIRED } = require('./constants');
const generateId = () => crypto.randomBytes(16).toString('hex');
const BillingAddress = require('./models/billingAddress');
const DeliveryAddress = require('./models/deliveryAddress');
const WALCART_AUTH = 'walcart-pool';
module.exports = api;
api.corsOrigin('*');
api.corsHeaders('Content-Type,Authorization');
api.registerAuthorizer(WALCART_AUTH, {
  providerARNs: [process.env.cognito_arn]
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Users ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/**
 * Gets a user by id (email)
 * @param id
 */
api.get(
  '/user/{id}',
  async request => {
    'use strict';
    const params = new DynamoParams('users', request.pathParams.id);
    try {
      const user = (await dynamoDb.get(params).promise()).Item;
      isResultEmpty(user, 'user');
      return user;
    } catch (error) {
      handleError(error, 'user', 'get');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH }
);
/**
 * Creates a user
 */
api.post(
  '/user',
  async request => {
    'use strict';

    const params = {
      TableName: 'users',
      Item: {
        id: request.body.id,
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        deliveryAddress: {
          type: 'DeliveryAddress',
          addressLine1: null,
          addressLine2: null,
          city: null,
          state: null,
          country: null,
          zip: null,
          deliverToFirstName: request.body.firstName,
          deliverToLastName: request.body.lastName
        },
        billingAddress: {
          type: 'BillingAddress',
          addressLine1: null,
          addressLine2: null,
          city: null,
          state: null,
          country: null,
          zip: null,
          deliverToFirstName: request.body.firstName,
          deliverToLastName: request.body.lastName,
          isSameAsDeliveryAddress: true
        },
        lastVisited: (Date.now() / 1000) | 0
      },
      ConditionExpression: 'attribute_not_exists(id)'
    };

    try {
      await dynamoDb.put(params).promise();
      return params.Item;
    } catch (error) {
      return handleError(error);
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 201 }
);
/**
 * Updates a user
 */
api.put(
  '/user',
  async request => {
    'use strict';

    const params = {
      TableName: 'users',
      Item: request.body,
      ConditionExpression: 'attribute_exists(id)'
    };

    await dynamoDb.put(params).promise();
    return true;
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 202 }
);
/**
 * Deletes a user
 * @param id
 */
api.delete(
  '/user/{id}',
  async request => {
    'use strict';
    const params = {
      Key: {
        id: request.pathParams.id
      },
      TableName: 'users'
    };
    try {
      await dynamoDb.delete(params).promise();
      return true;
    } catch (error) {
      return handleError(error);
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 202 }
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Carts ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/**
 * Gets a cart by id
 * @param id
 */
api.get(
  '/cart/{id}',
  async request => {
    'use strict';
    const params = new DynamoParams('carts', request.pathParams.id);
    try {
      const cart = (await dynamoDb.get(params).promise()).Item;
      isResultEmpty(cart, 'cart');
      return cart;
    } catch (error) {
      handleError(error, 'cart', 'get');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH }
);
/**
 * Creates a cart
 */
api.post(
  '/cart',
  async request => {
    'use strict';

    const params = {
      TableName: 'carts',
      Item: {
        id: request.body.id,
        products: request.products,
        createDate: (Date.now() / 1000) | 0
      },
      ConditionExpression: 'attribute_not_exists(id)'
    };

    try {
      await dynamoDb.put(params).promise();
      return true;
    } catch (error) {
      return handleError(error, 'cart', 'create');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 201 }
);
/**
 * Updates a cart
 */
api.put(
  '/cart',
  async request => {
    'use strict';

    const params = {
      TableName: 'carts',
      Item: request.body,
      ConditionExpression: 'attribute_exists(id)'
    };
    try {
      await dynamoDb.put(params).promise();
      return true;
    } catch (error) {
      return handleError(error, 'cart', 'update');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 202 }
);
/**
 * Deletes a cart
 * @param id
 */
api.delete(
  '/cart/{id}',
  async request => {
    'use strict';
    const params = {
      Key: {
        id: request.pathParams.id
      },
      TableName: 'carts'
    };
    try {
      await dynamoDb.delete(params).promise();
      return true;
    } catch (error) {
      return handleError(error, 'cart', 'delete');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 202 }
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Orders ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/**
 * Gets a order by id
 * @param id
 */
api.get(
  '/order/{id}',
  async request => {
    'use strict';
    const params = new DynamoParams('orders', request.pathParams.id);
    try {
      const order = (await dynamoDb.get(params).promise()).Item;
      isResultEmpty(order, 'orders');
      return order;
    } catch (error) {
      handleError(error, 'order', 'get');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH }
);
/**
 * Creates a order
 */
api.post(
  '/order',
  async request => {
    'use strict';

    const params = {
      TableName: 'orders',
      Item: {
        id: new DBProperty(generateId(), 'id', null, AUTO).value,
        userId: new DBProperty(request.body.userId, 'userId', null, REQUIRED)
          .value,
        deliveryStatus: new DBProperty(
          request.body.deliveryStatus,
          'deliveryStatus',
          {}
        ).value,
        deliveryAddress: new DeliveryAddress(request.body.deliveryAddress),
        billingAddress: new BillingAddress(request.body.billingAddress),
        totalCost: new DBProperty(request.body.totalCost, 'deliveryAddress', 0)
          .value,
        totalNumberOfItems: new DBProperty(
          request.body.totalNumberOfItems,
          'totalNumberOfItems',
          0
        ).value,
        cartId: new DBProperty(request.body.cartId, 'cartId', null).value,
        createDate: +(Date.now() / 1000)
      },
      ConditionExpression: 'attribute_not_exists(id)'
    };

    try {
      await dynamoDb.put(params).promise();
      await updateUser('previousOrders', params.Item.userId, params.Item.id);
      return params.Item.id;
    } catch (error) {
      return handleError(error, 'order', 'create');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 201 }
);
/**
 * Updates a order
 */
api.put(
  '/order',
  async request => {
    'use strict';

    const params = {
      TableName: 'order',
      Item: request.body,
      ConditionExpression: 'attribute_exists(id)'
    };
    try {
      await dynamoDb.put(params).promise();
      return true;
    } catch (error) {
      return handleError(error, 'order', 'update');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 202 }
);
/**
 * Deletes a cart
 * @param id
 */
api.delete(
  '/order/{id}',
  async request => {
    'use strict';
    const params = {
      Key: {
        id: request.pathParams.id
      },
      TableName: 'order'
    };
    try {
      await dynamoDb.delete(params).promise();
      return true;
    } catch (error) {
      return handleError(error, 'order', 'delete');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH, success: 202 }
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Products ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/**
 * Gets the cached product categories
 */
api.get('/product-categories', async request => {
  'use strict';
  const params = {
    TableName: 'product-categories'
  };
  try {
    const res = await dynamoDb.scan(params).promise();
    return new api.ApiResponse(
      res.Items,
      { 'Content-Type': 'application/json' },
      200
    );
  } catch (error) {
    return handleError(error, 'product catergories', 'get');
  }
});

api.any('/walmart/{proxy+}', async request => {
  'use strict';
  const proxyurl = new URL(
    `http://api.walmartlabs.com/${request.pathParams.proxy}`
  );

  for (const kvp in request.queryString) {
    proxyurl.searchParams.append(kvp, request.queryString[kvp]);
  }
  proxyurl.searchParams.append('apiKey', process.env.apiKey);
  proxyurl.searchParams.append('format', 'json');
  try {
    const res = await axios.get(proxyurl.toString());
    return new api.ApiResponse(
      res.data,
      { 'Content-Type': 'application/json' },
      200
    );
  } catch (err) {
    return new api.ApiResponse(
      { error: `While trying to load page` },
      {
        'Content-Type': 'application/json'
      },
      500
    );
  }
});

function handleError(error, table, action) {
  console.log('error', error);
  if (error instanceof NotFoundError) {
    return new api.ApiResponse(
      error,
      {
        'Content-Type': 'application/json'
      },
      404
    );
  } else if (
    error.code === 'ConditionalCheckFailedException' &&
    action === 'post'
  ) {
    return new api.ApiResponse(
      { error: `Already Exists` },
      {
        'Content-Type': 'application/json'
      },
      409
    );
  } else if (
    error.code === 'ConditionalCheckFailedException' &&
    action === 'put'
  ) {
    return new api.ApiResponse(
      { error: `Not Found` },
      {
        'Content-Type': 'application/json'
      },
      404
    );
  } else {
    return new api.ApiResponse(
      { error: `An error occurred while trying to ${action} ${table}.` },
      {
        'Content-Type': 'application/json'
      },
      500
    );
  }
}
async function updateUser(arrayName, key, value) {
  const params = {
    TableName: 'users',
    Key: {
      id: key
    },
    UpdateExpression:
      'set #arrayToUpdate = list_append(if_not_exists(#arrayToUpdate, :empty_list), :array)',
    ExpressionAttributeNames: {
      '#arrayToUpdate': arrayName
    },
    ExpressionAttributeValues: {
      ':array': [value],
      ':empty_list': []
    }
  };

  try {
    await dynamoDb.update(params).promise();
    return true;
  } catch (error) {
    return handleError(error, 'user', 'update');
  }
}
function isResultEmpty(obj, objName) {
  if (Object.keys(obj).length === 0) {
    throw new NotFoundError(`${objName} not found`);
  }
}
