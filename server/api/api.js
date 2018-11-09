/*global require, module*/
const ApiBuilder = require('claudia-api-builder'),
  AWS = require('aws-sdk'),
  api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  DynamoParams = require('./DynamoParams'),
  NotFoundError = require('./NotFoundError');
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
      const user = await dynamoDb.get(params).promise().Item;
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
  request => {
    'use strict';
    const params = {
      TableName: 'users',
      Item: {
        id: request.body.id,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        lastVisited: new Date()
      },
      ConditionExpression: 'attribute_not_exists(id)'
    };
    try {
      return dynamoDb.put(params).promise();
    } catch (error) {
      return handleError(error);
    }
  },
  { cognitoAuthorizer: WALCART_AUTH }
);
/**
 * Updates a user
 */
api.put(
  '/user',
  function(request) {
    'use strict';
    console.log(request);
    return request.lambdaContext;
  },
  { cognitoAuthorizer: WALCART_AUTH }
);
/**
 * Deletes a user
 * @param id
 */
api.delete(
  '/user/{id}',
  function(request) {
    'use strict';
    console.log(request);
    return request.lambdaContext;
  },
  { cognitoAuthorizer: WALCART_AUTH }
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Carts ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Orders ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Products ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/**
 * Gets the cached product categories
 */
api.get(
  '/product-categories',
  async request => {
    'use strict';
    const params = {
      TableName: 'product-categories'
    };
    try {
      const res = await dynamoDb.scan(params).promise();
      return new api.ApiResponse(
        res.Items,
        { 'X-Version': '303', 'Content-Type': 'application/json' },
        200
      );
    } catch (error) {
      return handleError(error, 'product catergories', 'get');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH }
);

function handleError(error, table, action) {
  console.log(error);
  if (error instanceof NotFoundError) {
    return new api.ApiResponse(
      error,
      {
        'X-Version': '303',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      404
    );
  } else {
    return new api.ApiResponse(
      { error: `An error occurred while trying to ${action} ${table}.` },
      {
        'X-Version': '303',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      500
    );
  }
}

function isResultEmpty(obj, objName) {
  if (Object.keys(obj).length === 0) {
    throw new NotFoundError(`${objName} not found`);
  }
}
