const axios = require('axios');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const json = require('./categories.json');
exports.handler = async event => {
  const res = await axios.get(
    `http://api.walmartlabs.com/v1/taxonomy?apiKey=${
      process.env.apiKey
    }&format=json`
  );
  let food = res.data.categories.find(item => item.name === 'Food');

  const items = food.children
    .filter(itm => filter(itm.id))
    .map(itm => ({
      PutRequest: {
        Item: {
          id: itm.id,
          name: itm.name,
          children: itm.children
        }
      }
    }));

  const params = {
    RequestItems: {
      'product-categories': items
    }
  };

  await docClient.batchWrite(params).promise();
  return true;
};

function filter(id) {
  for (const category of json) {
    if (category.id === id) {
      return true;
    }
  }
  return false;
}
