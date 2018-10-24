const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async event => {
  var params = {
    Key: {
      shopperId: {
        S: event.id
      }
    },
    TableName: 'shoppers'
  };

  const data = await dynamodb.getItem(params).promise();

  if (data.Item) {
    const user = {
      id: data.Item.shopperId.S,
      lastVisited: +data.Item.lastVisited.N,
      currentShoppingCart: data.Item.currentShoppingCart.S,
      lastName: data.Item.lastName.S,
      firstName: data.Item.firstName.S,
      email: data.Item.email.S,
      currentOrder: data.Item.currentOrder.S,
      previousOrders: data.Item.previousOrders.SS
    };
    return user;
  } else {
    return {
      error: `No user found with the ID: ${event.id}`
    };
  }
};
