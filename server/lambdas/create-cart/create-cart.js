const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

class CartParams {
  constructor(id) {
    this.TableName = 'carts';
    this.Key = id;
  }
}

exports.handler = async event => {
  const params = new CartParams(event.id);
  params.Item = event;
  params.ConditionExpression = 'attribute_not_exists(id)';

  try {
    await docClient.put(params).promise();
    return 'success';
  } catch (err) {
    console.log(err);
    if (err.code === 'ConditionalCheckFailedException') {
      throw 'Cart already exists';
    }
    throw 'An error occurred creating cart';
  }
};
