/*global require, module*/
const ApiBuilder = require('claudia-api-builder'),
  AWS = require('aws-sdk'),
  api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  DynamoParams = require('./DynamoParams'),
  NotFoundError = require('./NotFoundError');
const WALCART_AUTH = 'walcartpool';
module.exports = api;
api.corsOrigin('*');
api.corsHeaders('Content-Type,Authorization');
api.registerAuthorizer(WALCART_AUTH, {
  providerARNs: [process.env.cognito_arn]
});

api.get(
  '/user/{id}',
  async request => {
    'use strict';
    const params = new DynamoParams('users', request.pathParams.id);
    try {
      const user = await dynamoDb.get(params).promise();
      isResultEmpty(user, 'user');
      return user;
    } catch (error) {
      handleError(error, 'user', 'get');
    }
  },
  { cognitoAuthorizer: WALCART_AUTH }
);

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
api.post('/user', function(request) {
  'use strict';
  console.log(request);
  return request.lambdaContext;
});

api.put('/user', function(request) {
  'use strict';
  console.log(request);
  return request.lambdaContext;
});

api.delete('/user/{id}', function(request) {
  'use strict';
  console.log(request);
  return request.lambdaContext;
});

function handleError(error, table, action) {
  console.log(error);
  if (error instanceof NotFoundError) {
    return new api.ApiResponse(
      error,
      { 'X-Version': '303', 'Content-Type': 'application/json' },
      404
    );
  } else {
    return new api.ApiResponse(
      { error: `An error occurred while trying to ${action} ${table}.` },
      { 'X-Version': '303', 'Content-Type': 'application/json' },
      500
    );
  }
}

function isResultEmpty(obj, objName) {
  if (Object.keys(obj).length === 0) {
    throw new NotFoundError(`${objName} not found`);
  }
}
